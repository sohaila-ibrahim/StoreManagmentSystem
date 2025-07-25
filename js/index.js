var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById('productprice');
var count = document.getElementById("productCount");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById('productDescription');
var productImageInput = document.getElementById('productImage');
var searchInput = document.getElementById('searchInput');
var categorySearchInput = document.getElementById('categorySearchInput');
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var productContainer ;
//new customer
if(localStorage.getItem("products") == null){
    productContainer = [];
}
else{ //old customer
    productContainer = JSON.parse(localStorage.getItem("products"));
    displayProduct();
}
//add product
function addProduct ()
{
    
    console.log(productImageInput.value);
    for (var i = 0; i <Number(count.value); i++) {
        var product ={
        code:productNameInput.value ,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescriptionInput.value,
        image:`images/products/${productImageInput.files[0]?.name}`
    }
    productContainer.push(product);
     //rest
}
    clearForm()
    //console.log(productContainer);
    displayProduct();
    localStorage.setItem('products' , JSON.stringify(productContainer));

}
function clearForm()
{
    productNameInput.value = null ;
    productPriceInput.value = null ;
    productCategoryInput.value = null ;
    productDescriptionInput.value = null ;
    productImageInput.value = null ;
}
function displayProduct(product = productContainer)
{
    var cartona =``;
    for (var i=0;i<product.length ;i++)
    {
        cartona +=`<div class="col-md-2 col-sm-6">
                <div class="product">
                <img src="${product[i].image}"  alt="productName">
                <h2 class="h4 mt-3">${product[i].code}</h2>     
                <p class="text-secondary mt-2">${product[i].desc} </p>
                <h3 class="h5 "><span class="fw-bold">price :</span>${product[i].price}  </h3>
                <h3 class="h5" ><span class="fw-bold">category:</span>${product[i].category} </h3>
                <button onclick ="deleteProduct(${i})"class="btn btn-outline-danger btn-sm w-100 my-2">Delete <i class="fas fa-trash-alt"></i></button>
                <button onclick ="setFormForUpdate(${i})" class="btn btn-outline-warning btn-sm w-100 my-2">Update <i class="fas fa-pen"></i></button>

            </div>
            </div> 
        `;
    }
    document.getElementById('rowData').innerHTML = cartona;
}
function deleteProduct(deletedIndex){
    productContainer.splice(deletedIndex,1);
    displayProduct();
    localStorage.setItem('products' , JSON.stringify(productContainer));
    console.log(productContainer);
}
function searchProduct(term)
{
    var term = searchInput.value.toLowerCase();
    var cartona =``;
    for (var i=0;i<productContainer.length ;i++)
    {
        if(productContainer[i].code.toLowerCase().includes(term.toLowerCase()) ==true)
        {
            cartona +=`<div class="col-md-2 col-sm-6">
                <div class="product">
                <img src="${productContainer[i].image}\"  alt="productName">
                <h2 class="h4 mt-3">${productContainer[i].code}</h2>     
                <p class="text-secondary mt-2">${productContainer[i].desc} </p>
                <h3 class="h5 "><span class="fw-bold">price :</span>${productContainer[i].price}  </h3>
                <h3 class="h5" ><span class="fw-bold">category:</span>${productContainer[i].category} </h3>
                <button onclick ="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-100 my-2">Delete <i class="fas fa-trash-alt"></i></button>
                <button onclick ="setFormForUpdate(${i})" class="btn btn-outline-warning btn-sm w-100 my-2">Update <i class="fas fa-pen"></i></button>

            </div>
            </div> 
        `;
        }
    }
        document.getElementById('rowData').innerHTML = cartona;
}
var updateIndex ;
function setFormForUpdate(i)
{ 
    updateIndex = i;
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    productNameInput.value = productContainer[i].code;
    productPriceInput.value = productContainer[i].price;
    productCategoryInput.value = productContainer[i].category;
    productDescriptionInput.value = productContainer[i].desc;
    
}
function updateProduct()
{
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    productContainer[updateIndex].code = productNameInput.value;
    productContainer[updateIndex].price = productPriceInput.value;
    productContainer[updateIndex].category = productCategoryInput.value;
    productContainer[updateIndex].desc = productDescriptionInput.value;
    displayProduct()
    localStorage.setItem('products' , JSON.stringify(productContainer));
}
function clearAllProduct() {
    productContainer = [];
    localStorage.removeItem("productContainer");
    displayProduct();
}
function searchByCategory() {
    var keyword = categorySearchInput.value.toLowerCase();
    var filtered = productContainer.filter(p => p.category.toLowerCase().includes(keyword));
    displayProduct(filtered);
}

function validateProductName()
{
    var Regex = /^[A-Z][a-z]{2,8}/;
    var myStr =productNameInput.value;
    if(Regex.test(myStr) == true)
    {
        console.log('match');
    }
    else 
    {
        console.log('no match');
    }
}