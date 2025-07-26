//input for products:(productName ,productprice,productCount,
// productCategory,productDescription,productImage,searchInput,
// categorySearchInput)
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById('productprice');
var stockInput = document.getElementById("productStock");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById('productDescription');
var productImageInput = document.getElementById('productImage');
var searchInput = document.getElementById('searchInput');
var categorySearchInput = document.getElementById('categorySearchInput');
var addBtn = document.getElementById("addBtn") ;//Button to add a new product
var updateBtn = document.getElementById("updateBtn");//Button to update products
var productContainer ;//to store all product

//new customer
if(localStorage.getItem("products") == null)
{
    productContainer = [];
}
else
{ //old customer
    productContainer = JSON.parse(localStorage.getItem("products"));
    displayProduct();
}

//add anew product to container
function addProduct ()
{
        var product ={
        code:productNameInput.value ,//product name
        price:Number(productPriceInput.value),//product price
        category:productCategoryInput.value,//product category
        desc:productDescriptionInput.value,//product Desc
        image:`${productImageInput.files[0]?.name}`,//product image
        stock:Number(stockInput.value)//stock Quantity as a number
    };
    productContainer.push(product);//add product to container
    clearForm();//rest the input
    displayProduct();//update display for product
    localStorage.setItem('products' , JSON.stringify(productContainer));//save update on localStorage
}

//clear all form input
function clearForm()
{
    productNameInput.value = null ;//clear product name
    productPriceInput.value = null ;//clear product price
    productCategoryInput.value = null ;//clear product category
    productDescriptionInput.value = null ;//clear productn Desc
    stockInput.value = null;//clear stock Quantity
    productImageInput.value = null ;//clear product image
}


//display products
function displayProduct(product = productContainer)
{
    var productHTML =``;//HTML string for product cards
    for (var i=0;i<product.length ;i++)
    {
        productHTML +=`<div class="col-md-2 col-sm-6">
                <div class="product">
                <img src="images/products/${product[i].image}"  alt="productName">
                <h2 class="h4 mt-3">${product[i].code}</h2>     
                <p class="text-secondary mt-2">${product[i].desc} </p>
                <h3 class="h6"><span class="fw-bold">Stock:</span> ${product[i].stock}</h3>
                <h3 class="h5 "><span class="fw-bold">price :</span>${product[i].price}  </h3>
                <h3 class="h5" ><span class="fw-bold">category:</span>${product[i].category} </h3>
                <button onclick ="deleteProduct(${i})"class="btn btn-outline-danger btn-sm w-100 my-2">Delete <i class="fas fa-trash-alt"></i></button>
                <button onclick ="setFormForUpdate(${i})" class="btn btn-outline-warning btn-sm w-100 my-2">Update <i class="fas fa-pen"></i></button>

            </div>
            </div> 
        `;
    }
    document.getElementById('rowData').innerHTML = productHTML;//update the product display area
}


//delete aproduct by index
function deleteProduct(deletedIndex)
{
    productContainer.splice(deletedIndex,1);//remove one product from array 
    displayProduct();//Refresh display
    localStorage.setItem('products' , JSON.stringify(productContainer));//update localStorage
}


//search product by name
function searchProduct()
{
    var term = searchInput.value.toLowerCase();//get search term
    var productHTML =``;//HTML string for matching products 
    for (var i=0;i<productContainer.length ;i++)
    {    //check if product name mathes search termp
        if(productContainer[i].code.toLowerCase().includes(term.toLowerCase()) ==true)
        {
            productHTML +=`<div class="col-md-2 col-sm-6">
                <div class="product">
                <img src="images/products/${productContainer[i].image}"  alt="productName">
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
    document.getElementById('rowData').innerHTML = productHTML;//update display with search results
}


var updateIndex ;// Store index of product being updated
// Prepare form for updating a product
function setFormForUpdate(i)
{ 
    updateIndex = i;// Set the index of the product to update
    addBtn.classList.add('d-none');//hide add button
    updateBtn.classList.remove('d-none');//show uodate button
    productNameInput.value = productContainer[i].code;
    productPriceInput.value = productContainer[i].price;
    productCategoryInput.value = productContainer[i].category;
    productDescriptionInput.value = productContainer[i].desc;
    stockInput.value = productContainer[i].stock;
}


//Update products
function updateProduct()
{
    addBtn.classList.remove('d-none');//show add button
    updateBtn.classList.add('d-none');//hide update button
    productContainer[updateIndex].code = productNameInput.value;//update product name
    productContainer[updateIndex].price = productPriceInput.value;//update product price
    productContainer[updateIndex].category = productCategoryInput.value;//update product category
    productContainer[updateIndex].desc = productDescriptionInput.value;//update product Desc
    productContainer[updateIndex].image = productImageInput.files[0]?.name;//update product image

    productContainer[updateIndex].stock = Number(stockInput.value);//update product stock
    displayProduct();
    localStorage.setItem('products' , JSON.stringify(productContainer));// Update localStorage
}


//clearAllProduct
function clearAllProduct() {
    productContainer = [];
    localStorage.removeItem("products");// Remove products from localStorage
    displayProduct();//Refresh display
}


//search By Category
function searchByCategory() {
    var keyword = categorySearchInput.value.toLowerCase();//get category search term
    var filtered = productContainer.filter(p => p.category.toLowerCase().includes(keyword));//filtered products by category
    displayProduct(filtered);//diaplay filterd products
}


// Validate product name format
function validateProductName()
{
    var Regex = /^[A-Z][a-z]{2,8}/;// Regex for name:(starts with capital letter, followed by 2-8 lowercase letters)
    var myStr =productNameInput.value;// Get product name input
    if(Regex.test(myStr) == true)
    {
        console.log('match');// Log if name matches regex
        return true;
    }
    else 
    {
        console.log('no match'); // Log if name does not match regex
        return false;
    }
}