    let mainProduct = {{ product | json }};
    let shopCurrency = {{ cart.currency.symbol | json }};
    let userSelectValues = [];
    const Selector =  $('.swatch input');
       Selector.on('change', function() {
        userSelectValues = [];
        Selector.each(function( index ) {
          if($(this).is(':checked')){
            userSelectValues.push($(this).val());
        }
        });
    const matchedVariants = mainProduct.variants.find(variant => {
          let match = true;
                
          for (let i = 0; i < userSelectValues.length; i++) {
              if (userSelectValues.indexOf(variant.options[i]) == -1) {
                  match = false;
                  break;
              }
          }
          return match;
      }); 
      console.log("matching ", matchedVariants); 
       $('.cart-part-enable input[name="id"]').val(matchedVariants.id);
       $('.cart-part-enable input[name="id"]').attr('data-value', matchedVariants.id);
       var image =$(".v_image").find('img');
       if(matchedVariants.featured_image != null && image != null){
        image.attr("src", matchedVariants.featured_image.src);
      }
       var price = $(".price");
       if(price != null ){
        price.text (`${shopCurrency}${(matchedVariants.price / 100).toFixed(2)}`);
      }

       var price__compare = $(".price_compare");
       if(price__compare != null && matchedVariants.compare_at_price > matchedVariants.price ){
        price__compare.text(`${shopCurrency}${(matchedVariants.compare_at_price / 100).toFixed(2)}`);

       }

      }); 
