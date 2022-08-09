document.querySelector("#new-gear").addEventListener("submit",e=>{
    e.preventDefault();
    const gearObj = {
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


