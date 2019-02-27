        // jshint esversion:6

const localStorageContent = JSON.parse(localStorage.getItem("cartItems"));
const cartContent = document.querySelector(".itemsList tbody");
$('.dropdown-menu').click(function(e) {
    e.stopPropagation();
});
window.addEventListener("load", memory);
document.body.addEventListener("click", function(e){
  if (e.target.classList.contains("add")){
    e.preventDefault();
    let stepOne = e.target.parentElement.parentElement.parentElement.parentElement;

    itemInfo(stepOne);

  }
});
cartContent.addEventListener("click", function(e){
  if (e.target.classList.contains("removeB")){
    removeElement(e);
  }
});
document.getElementById("clear").addEventListener("click", clear);

function itemInfo(item){
const info = {
    image : item.querySelector("img").src,
    name: item.querySelector("h3").textContent,
    price: item.querySelector("span").textContent,
    id: item.querySelector("p").getAttribute("data-id")
  };
  insertInfo(info);
  addToCart(info);

}
function insertInfo(names){
  const row = document.createElement("tr");
  row.innerHTML = `
    <tr>
         <td> <img src = "${names.image}"class = "cartImg"> </td>
         <td> ${names.name} </td>
         <td> ${names.price} </td>
         <td> <a class = "removeB" data-id = "${names.id}">X</a><td>
     </tr>
  `;
  cartContent.appendChild(row);


}
function addToCart(items){
   let cartItems = getList();
   cartItems.push(items);
   localStorage.setItem("cartItems", JSON.stringify(cartItems));

}
//
function getList(){
  let cartItems;
  let cartItemsLs = localStorage.getItem("cartItems");
  if (cartItemsLs === null){
    cartItems = [];
  } else{
    cartItems = JSON.parse(cartItemsLs);
  }
    return cartItems;
  }

function memory(){
  if (localStorageContent === null){
  console.log("empty");
  }else{
 let printElements = getList();
  printElements.forEach(function(names) {
  const row = document.createElement("tr");
 row.innerHTML= `
 <tr>
      <td> <img src = "${names.image}"class = "cartImg"> </td>
      <td> ${names.name} </td>
      <td> ${names.price} </td>
      <td> <a class = "removeB" data-id = "${names.id}">X</a><td>
  </tr>
 `;
 cartContent.appendChild(row);
});

}
}
function removeElement(e){
  e.target.parentElement.parentElement.remove();
  let item = e.target.parentElement;

  let itemId = item.querySelector("a").getAttribute('data-id');


  let cartItems = getList();
  cartItems.forEach(function(element, index){

  if (itemId===  element.id)  {
     cartItems.splice(index,1);}
  });
localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
function clear(){
  while(cartContent.firstChild){
    cartContent.removeChild(cartContent.firstChild);
  }
  localStorage.clear();
}
