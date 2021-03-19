// -----JS CODE-----
//@input Component.MeshVisual meshVisual
//@input Asset.Material[] materials
//@input Component.ScriptComponent suncollider
//@input Component.ScriptComponent earthcollider
//@input Component.ScriptComponent mercurycollider
//@input Component.ScriptComponent venuscollider
//@input Component.ScriptComponent marscollider
//@input Component.ScriptComponent jupitercollider
//@input Component.ScriptComponent saturncollider
//@input Component.ScriptComponent uranuscollider
//@input Component.ScriptComponent neptunecollider
//@input Component.ScriptComponent buttonWidget
//@input SceneObject sphere

// @input SceneObject[] obj
// @input SceneObject[] extras


inside = 0;
material = 0;
function setMaterial(material){
 script.meshVisual.clearMaterials();
 script.meshVisual.addMaterial(material);
}

script.createEvent("TurnOnEvent").bind(function(){
    var sunCollider = script.suncollider.api.collider;
    var earthCollider = script.earthcollider.api.collider;
    var mercuryCollider = script.mercurycollider.api.collider;
    var venusCollider = script.venuscollider.api.collider;
    var marsCollider = script.marscollider.api.collider;
    var jupiterCollider = script.jupitercollider.api.collider;
    var saturnCollider = script.saturncollider.api.collider;
    var uranusCollider = script.uranuscollider.api.collider;
    var neptuneCollider = script.neptunecollider.api.collider;
    
 sunCollider.addOnEnterCallback("ship", function(otherCollider) {
       script.buttonWidget.api.enableInteractable();
     print("entered collision with " + otherCollider.name);
      material = 0;
 });
    
    earthCollider.addOnEnterCallback("ship", function(otherCollider) {
        script.buttonWidget.api.enableInteractable();
     print("entered collision with " + otherCollider.name);  
       material = 1;
 });
    
      mercuryCollider.addOnEnterCallback("ship", function(otherCollider) {
        script.buttonWidget.api.enableInteractable();
     print("entered collision with " + otherCollider.name);  
        material = 2;
 }); 
    earthCollider.add
    
    
     
})

function onEnterPress(){
    print(inside);
    if(inside == 0){
       script.sphere.enabled = true;
       setMaterial(script.materials[material]);
        for (var i = 0;i < script.obj.length; i++)
        {
        
           script.obj[i].enabled = false ;
        
        }
        for (var i = 0;i < script.extras.length; i++)
        {
        
           script.extras[i].enabled = false;
        
        }
        script.extras[material].enabled = true;
        inside++;
    }
    else if (inside == 5) {
       script.buttonWidget.api.disableInteractable(); 
       script.sphere.enabled = false;
        for (var i = 0;i < script.obj.length; i++)
        {
        
           script.obj[i].enabled = true;
        
        } 
        inside = 0;
    }
    else{
        inside++;
    }
}


script.api.onEnterPress = onEnterPress;