let addtocart = document.getElementsByClassName("addtocart");
console.log(addtocart);

let items = []

for(let i=0 ; i<addtocart.length ; i++){
    addtocart[i].addEventListener("click",function(e){
        console.log(i+1, e.target.parentElement.parentElement.children);
        if(typeof(Storage) !== 'undefined'){
            let item = {
                id : i+1,
                name : e.target.parentElement.children[0].textContent,
                price : e.target.parentElement.children[1].textContent,
                img : e.target.parentElement.parentElement.children[0].src,
                no : 1
            }
            if(JSON.parse(localStorage.getItem('items')) === null){
                items.push(item);
                localStorage.setItem("items" ,JSON.stringify(items) );
                window.location.reload();
                e.preventDefault()
            }else{
                const localItems = JSON.parse(localStorage.getItem("items"));

                localItems.map((data)=>{
                    if(item.id == data.id){
                        item.no = data.no +1;
                    }else{
                        items.push(data);
                    }
                });
                items.push(item);
                localStorage.setItem('items',JSON.stringify(items));
                window.location.reload();
                e.preventDefault();
            }
        }else{
            alert("Local Storage Is Not Working on Your Browser");
        }

    })

    let tablecontainer = document.getElementById("table");
    let tablediv = `
    <tr>
    <th>Item Image</th>
    <th>Item Name</th>
    <th>Item no.</th>
    <th>Item Price</th>
    <th>Remove</th>
    </tr>
    `

    if(JSON.parse(localStorage.getItem('items'))=== null){
     tablediv += `<tr><td colspan ="5"> <center>
     No Items Found <center></td></tr>
     `   
    }else{
        JSON.parse(localStorage.getItem('items')).map(data=>{
            tablediv += `
            <tr>
            <td ><center><img src="${data.img}" style="height: 60px ; width: 60px ; padding: 5px;"></center></td>
            <td>${data.name}</td>
            <td>${data.no}</td>
            <td>${data.price}</td>
            <td><a href="#" onClick=Delete(this)>Delete</a></td>
            `
        })
    }

    tablecontainer.innerHTML = tablediv;

}

function Delete(e){
    let items=[];
    JSON.parse(localStorage.getItem('items')).map(data=>{
        if(data.name != e.parentElement.parentElement.children[1].textContent){
            items.push(data);
        }
    });
    localStorage.setItem('items' , JSON.stringify(items));

    window.location.reload();
    e.preventDefault();
}


// function sidebar


function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }