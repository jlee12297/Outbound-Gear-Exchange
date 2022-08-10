document.querySelector("#new-gear").addEventListener("submit",e=>{
    e.preventDefault();
        let selected = document.querySelector('.selected').querySelector('span').textContent;
        let categoryvalue = 0

        //PLEASE DO NOT REMOVE THE SPACES OR CODE WILL BREAK
        if (selected == `
                                                    Hiking`) {
            categoryvalue = 1
        } else if (selected == `
                                                    Camping`){
            categoryvalue = 2
            
        } else if (selected == `
                                                    Skiing`){
            categoryvalue = 3
            
        } else if (selected == `
                                                    Rock Climbing`){
            categoryvalue = 4
            
        } else if (selected == `
                                                    Cycling`){
            categoryvalue = 5
            
        } else if (selected == `
                                                    Snowboarding`){
            categoryvalue = 6
            
        } else if (selected == `
                                                    Canoeing`){
            categoryvalue = 7
            
        } else if (selected == `
                                                    Paddleboarding`){
            categoryvalue = 8
            
        } else if (selected == `
                                                    Fishing`){
            categoryvalue = 9
            
        } else if (selected == `
                                                    Snow Shoeing`){
            categoryvalue = 10
            
        } else if (selected == `
                                                    Kayaking`){
            categoryvalue = 11
            
        } else {
            categoryvalue = 12
            
        }
    const gearObj = {
        category_id: categoryvalue,
        name:document.querySelector("#name").value,
        description:document.querySelector("#description").value,
        image:document.querySelector("#uploadedimage").src,
    }
    console.log(gearObj)
    fetch("/api/gears",{
        method:"POST",
        body:JSON.stringify(gearObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options);
  });


