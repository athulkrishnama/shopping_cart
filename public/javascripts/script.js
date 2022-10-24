
    function addToCart(proId){
        $.ajax(
            {
                url:'/add-to-cart/'+proId,
                method:'get',
                success:(response)=>{
                    if(response.status){
                        let count = $('#count').html()
                        count = parseInt(count) + 1
                        $('#count').html(count)
                    }
                    alert(response)
                }
            }
        )
    }
