

var startAjax =new XMLHttpRequest();

const row = document.querySelector('.row');

startAjax.onreadystatechange = function(){
    if (startAjax.readyState === 4)
    {
        var array = JSON.parse(startAjax.responseText);
        var arr = Object.values(array);
        var product = '<div>';
        for (let info of arr)
        {
            console.log();
            for(let inf of info)
            {
               product+='<div class="product">';
                product+='<img src="'+inf.thumbImg+'" class="img-responsive" alt="Responsive image">';
            product+='<h1>'+inf.title+'</h1>';
            product+='<p>'+inf.detail+'</p>';
            product+='<button class="btn btn-default add" data="'+inf.id+'" type="submit">Add to cart</button>';
    
         product+='</div>';
        
            }     
    }
    product += '</div';
    document.querySelector('.container').innerHTML = product;

    const addButton = document.querySelectorAll('.add');
    for (let i=0;i<addButton.length;i++)
    {
        addButton[i].addEventListener('click',addToCart);
    }

 //document.querySelector('.container').innerHTML = localStorage.getItem("lastname");
    
}
}
startAjax.open('GET', 'products.json');
startAjax.send();

function addToCart(e){
    //localStorage.removeItem("cart");
    let id = e.target.getAttribute('data');
    var retrievedData = localStorage.getItem("cart");
    console.log(id);
    if (!localStorage.hasOwnProperty('cart'))
    {
         var cart = [id];
       localStorage.setItem("cart", JSON.stringify(cart));
    }
    else {
         var products = JSON.parse(retrievedData);
         products.push(id);
         localStorage.setItem("cart", JSON.stringify(products));
          
    }
    var retrievedData2 = localStorage.getItem("cart");
   console.log(retrievedData2);
}

/************************************************************************************************* */
var cartAjax =new XMLHttpRequest();

cartAjax.onreadystatechange = function(){
    if (cartAjax.readyState === 4)
    {
        var array = JSON.parse(cartAjax.responseText);
        var arr = Object.values(array);
        var product = '<div>';
        product +="<h1>Cart</h1>"
        var retrievedData = localStorage.getItem("cart");
        for (let info of arr)
        {
            console.log();
            for(let inf of info)
            {
                for(let id of retrievedData)
                {
                    if(id==inf.id)
                    {
                     product+='<div class="product">';
                product+='<img src="'+inf.thumbImg+'" class="img-responsive" alt="Responsive image">';
                 product+='<h1>'+inf.title+'</h1>';
               
                product+='<p>'+inf.detail+'</p>';
                 product+='<button class="btn btn-default remove" data="'+inf.id+'" type="submit">Remove</button>';
                 product+='</div>';
                    }
           
                }
            }     
    }
    product += '</div';
    document.querySelector('.container').innerHTML = product;

    const removeButton = document.querySelectorAll('.remove');
    for (let i=0;i<removeButton.length;i++)
    {
        removeButton[i].addEventListener('click',removeFromCart);
    }

 //document.querySelector('.container').innerHTML = localStorage.getItem("lastname");
    
}
}

function removeFromCart(e){
    let id = e.target.getAttribute('data');
    var retrievedData = localStorage.getItem("cart");
    var array = JSON.parse(retrievedData)
    console.log(id);
    for(let i=0;i<array.length;i++)
    {
        if(array[i]==id)
        {
            array.splice(i,1);
            break;
        }
    }
         localStorage.setItem("cart", JSON.stringify(array));
         
         var retrievedData2 = localStorage.getItem("cart");
         console.log(retrievedData2);

         document.querySelector('.cart').click(); 
}




document.querySelector('.cart').onclick = function () {
cartAjax.open('GET', 'products.json');
cartAjax.send();
}

