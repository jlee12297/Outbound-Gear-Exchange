document.querySelector("#new-gear").addEventListener("submit",e=>{
    e.preventDefault();
    const gearObj = {
        name:document.querySelector("#name").value,
        description:document.querySelector("#description").value,
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

