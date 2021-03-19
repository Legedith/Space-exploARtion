// @input float thrustPower = 50.0
// @input float turnSpeed = 2.0

// @input SceneObject thrustVisual
// @input float thrustAnimSpeed = 6.0

var transform = script.getTransform();
var velocity = new vec3(0, 0, 0);

// Just for thrust animation visual
var thrustAnimTimer = 0.0;

function onUpPress() {
    addThrust(script.thrustPower);
}

function onLeftPress() {
   rotate(script.turnSpeed);
}

function onRightPress() {
   rotate(-script.turnSpeed); 
}

function addThrust(power) {
    var velocityToAdd = transform.forward.uniformScale(power * getDeltaTime());
    velocity = velocity.add(velocityToAdd);
    thrustAnimTimer = 1.0;
}

function rotate(speed) {
    var rotation = transform.getWorldRotation();
    var rotateAmount = quat.angleAxis(speed * getDeltaTime(), vec3.up());
    rotation = rotation.multiply(rotateAmount);
    transform.setWorldRotation(rotation);
}

function applyVelocity() {
    var movement = velocity.uniformScale(getDeltaTime());
    
    var position = transform.getWorldPosition();
    position = position.add(movement);
    transform.setWorldPosition(position);
}

// Purely optional, just for thrust animation visual
function updateThrustVisual() {
    thrustAnimTimer -= getDeltaTime() * script.thrustAnimSpeed;
    thrustAnimTimer = Math.max(0, thrustAnimTimer);
    
    if (script.thrustVisual) {
        var thrustScale = new vec3(1, 1, thrustAnimTimer);
        script.thrustVisual.getTransform().setLocalScale(thrustScale);
    }
}

function onUpdate() {
    applyVelocity();
    updateThrustVisual();
}

script.createEvent("UpdateEvent").bind(onUpdate);

// Other scripts can call these functions
// For example, call them through UIButton's Event Callbacks - Custom Function
script.api.onUpPress = onUpPress;
script.api.onLeftPress = onLeftPress;
script.api.onRightPress = onRightPress;
