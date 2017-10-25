
$('#storedName').html('Test User');

$('#storedName2').html('Test User');

 $("#loginSubmit").on("click", function send() {

  val = $('input[name=genderInput]:checked').val();
  console.log(val);
  window.val = val;

  if (val === 'Male'){
    $("#centerImage").attr("src", "../css/men.jpg");
  } else if (val === 'Female'){
    $("#centerImage").attr("src", "../css/women.jpg");
  } else if (val == 'Both'){
    $("#centerImage").attr("src", "../css/menwomen.jpg");
  }
 });

$("#yumbutton").on("click", function displayPicture() {

  console.log(val);
  if (val === 'Male'){
    displayPictureM();
  } else if
    (val === 'Female'){
  displayPictureW();
} else if (val === 'Both'){
  displayPictureMW();
};

});
// currently the Female model is the WORKING model. All other models will be updated upon functionality of female model.
function displayPictureW(){
$('#centerImage').remove();
$('#pictureView').empty();
  // var gender = $(this).attr('data-name');
  var queryURL = "http://api.shopstyle.com/api/v2/products?pid=uid3929-39772923-63&fts=women&offset=0&limit=20";

  $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

    console.log(response);
    var results = response.products;

    for (var i = 0; i < results.length; i++) {
      var pictureDiv = $('<div class="pictureDiv">');
      var p = $("<div class='overlay'></div>");
      var nastybutton = $("<div  class='nastybutton buttonWrapper2'><div class=' button' id='nastybutton'><a href='#' onclick='return false;'> nasty </a></div></div>");
      var yumbutton = $("<div  class='yumbutton buttonWrapper'><div class=' button' id='yumbutton'><a href='#' onclick='return false;'> yum </a>");
          var Image = $("<img id='image' class='images'>");
          var Still = response.products[i].image.sizes.Best.url;
          var url = response.products[i].clickUrl;
          var id = response.products[i].id;
          var name = response.products[i].name;
          // ---------------------------------------------------- NEW CODE BELOW ------------------------------------------------------------- //
          // try catch block added because not all products have these properties.
          try {
          var brand = response.products[i].brand.name;
          var description = response.products[i].description;
          var color = response.products[i].colors["0"].name;
           // material and style are not provided by the API, therefore we must use regex functions to find them in the JSON description.
           var material = materialSearch(description);
           var style = styleSearch(description);
          } catch(e) {}
        
          // color, material, style, brand 
          console.log(Still);

          Image.attr('data-still', Still);
          Image.attr('src', Still);
          yumbutton.attr('data-id', response.products[i].id);
          yumbutton.attr('data-url', response.products[i].clickUrl);
          yumbutton.attr('data-name', response.products[i].name);
          try {
          yumbutton.attr('data-material', material);
          yumbutton.attr('data-style', style);
          yumbutton.attr('data-brand', response.products[i].brand.name);
          yumbutton.attr('data-color', response.products[i].colors["0"].name);
          } catch(e){}
          nastybutton.attr('data-id', response.products[i].id);
          nastybutton.attr('data-url', response.products[i].clickUrl);
          nastybutton.attr('data-name', response.products[i].name);
          try {
          nastybutton.attr('data-material', response.products[i].name);
          nastybutton.attr('data-style', style);
          nastybutton.attr('data-brand', response.products[i].brand.name);
          nastybutton.attr('data-color', response.products[i].colors["0"].name);
          } catch(e){}


          pictureDiv.append(Image);
          pictureDiv.append(p);
          pictureDiv.append(yumbutton);
          pictureDiv.append(nastybutton);


        $('#pictureView').prepend(pictureDiv);

        };
        $('.yumbutton').on('click', function(event){
           var item = {
              productid: $(this).data('id'),
              url: $(this).data('url'),
              name: $(this).data('name'),
              liked: true,
              material: $(this).data('material'),
              style: $(this).data('style'),
              color: $(this).data('color'),
              brand: $(this).data('brand'),
           }
           getItem(item);
        console.log($(this).data('id'));
            $.post('/api/products', item)
            .done(function(data){
             console.log(data);
             console.log(item);
      });
       });
        $('.nastybutton').on('click', function(event){
          var item= {
              productid: $(this).data('id'),
              url: $(this).data('url'),
              name: $(this).data('name'),
              liked: false,
              material: $(this).data('material'),
              style: $(this).data('style'),
              color: $(this).data('color'),
              brand: $(this).data('brand'),
            }
        getItem(item);
        console.log(item);
            $.post('/api/products', item)
            .done(function(data){
             console.log(data);
             console.log(item);
        });
      });
        });
      };
      function displayPictureM(){
        $('#centerImage').remove();
        $('#pictureView').empty();
          // var gender = $(this).attr('data-name');
          var queryURL = "http://api.shopstyle.com/api/v2/products?pid=uid3929-39772923-63&fts=men&offset=0&limit=20";
        
          $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
        
            console.log(response);
            var results = response.products;
        
            for (var i = 0; i < results.length; i++) {
              var pictureDiv = $('<div class="pictureDiv">');
              var p = $("<div class='overlay'></div>");
              var nastybutton = $("<div  class='nastybutton buttonWrapper2'><div class=' button' id='nastybutton'><a href='#' onclick='return false;'> nasty </a></div></div>");
              var yumbutton = $("<div  class='yumbutton buttonWrapper'><div class=' button' id='yumbutton'><a href='#' onclick='return false;'> yum </a>");
                  var Image = $("<img id='image' class='images'>");
                  var Still = response.products[i].image.sizes.Original.url;
                  var url = response.products[i].clickUrl;
                  var id = response.products[i].id;
                  var name = response.products[i].name;
                  // ---------------------------------------------------- NEW CODE BELOW ------------------------------------------------------------- //
                  // try catch block added because not all products have these properties.
                  try {
                  var brand = response.products[i].brand.name;
                  var description = response.products[i].description;
                  var color = response.products[i].colors["0"].name;
                   // material and style are not provided by the API, therefore we must use regex functions to find them in the JSON description.
                   var material = materialSearch(description);
                   var style = styleSearch(description);
                  } catch(e) {}
                
                  // color, material, style, brand 
                  console.log(Still);
        
                  Image.attr('data-still', Still);
                  Image.attr('src', Still);
                  yumbutton.attr('data-id', response.products[i].id);
                  yumbutton.attr('data-url', response.products[i].clickUrl);
                  yumbutton.attr('data-name', response.products[i].name);
                  try {
                  yumbutton.attr('data-material', material);
                  yumbutton.attr('data-style', style);
                  yumbutton.attr('data-brand', response.products[i].brand.name);
                  yumbutton.attr('data-color', response.products[i].colors["0"].name);
                  } catch(e){}
                  nastybutton.attr('data-id', response.products[i].id);
                  nastybutton.attr('data-url', response.products[i].clickUrl);
                  nastybutton.attr('data-name', response.products[i].name);
                  try {
                  nastybutton.attr('data-material', response.products[i].name);
                  nastybutton.attr('data-style', style);
                  nastybutton.attr('data-brand', response.products[i].brand.name);
                  nastybutton.attr('data-color', response.products[i].colors["0"].name);
                  } catch(e){}
        
        
                  pictureDiv.append(Image);
                  pictureDiv.append(p);
                  pictureDiv.append(yumbutton);
                  pictureDiv.append(nastybutton);
        
        
                $('#pictureView').prepend(pictureDiv);
        
                };
                $('.yumbutton').on('click', function(event){
                   var item = {
                      productid: $(this).data('id'),
                      url: $(this).data('url'),
                      name: $(this).data('name'),
                      liked: true,
                      material: $(this).data('material'),
                      style: $(this).data('style'),
                      color: $(this).data('color'),
                      brand: $(this).data('brand'),
      
                   }
                   getItem(item);
                console.log($(this).data('id'));
                    $.post('/api/products', item)
                    .done(function(data){
                     console.log(data);
                     console.log(item);
              });
               });
                $('.nastybutton').on('click', function(event){
                  var item= {
                      productid: $(this).data('id'),
                      url: $(this).data('url'),
                      name: $(this).data('name'),
                      liked: false,
                      material: $(this).data('material'),
                      style: $(this).data('style'),
                      color: $(this).data('color'),
                      brand: $(this).data('brand'),
      
                    }
                getItem(item);
                console.log(item);
                    $.post('/api/products', item)
                    .done(function(data){
                     console.log(data);
                     console.log(item);
                });
              });
                });
              };
        
              function displayPictureMW(){
                $('#centerImage').remove();
                $('#pictureView').empty();
                  // var gender = $(this).attr('data-name');
                  var queryURL = "http://api.shopstyle.com/api/v2/products?pid=uid3929-39772923-63&fts=&offset=0&limit=20";
                
                  $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
                
                    console.log(response);
                    var results = response.products;
                
                    for (var i = 0; i < results.length; i++) {
                      var pictureDiv = $('<div class="pictureDiv">');
                      var p = $("<div class='overlay'></div>");
                      var nastybutton = $("<div  class='nastybutton buttonWrapper2'><div class=' button' id='nastybutton'><a href='#' onclick='return false;'> nasty </a></div></div>");
                      var yumbutton = $("<div  class='yumbutton buttonWrapper'><div class=' button' id='yumbutton'><a href='#' onclick='return false;'> yum </a>");
                          var Image = $("<img id='image' class='images'>");
                          var Still = response.products[i].image.sizes.Original.url;
                          var url = response.products[i].clickUrl;
                          var id = response.products[i].id;
                          var name = response.products[i].name;
                          // ---------------------------------------------------- NEW CODE BELOW ------------------------------------------------------------- //
                          // try catch block added because not all products have these properties.
                          try {
                          var brand = response.products[i].brand.name;
                          var description = response.products[i].description;
                          var color = response.products[i].colors["0"].name;
                           // material and style are not provided by the API, therefore we must use regex functions to find them in the JSON description.
                           var material = materialSearch(description);
                           var style = styleSearch(description);
                          } catch(e) {}
                        
                          // color, material, style, brand 
                          console.log(Still);
                
                          Image.attr('data-still', Still);
                          Image.attr('src', Still);
                          yumbutton.attr('data-id', response.products[i].id);
                          yumbutton.attr('data-url', response.products[i].clickUrl);
                          yumbutton.attr('data-name', response.products[i].name);
                          try {
                          yumbutton.attr('data-material', material);
                          yumbutton.attr('data-style', style);
                          yumbutton.attr('data-brand', response.products[i].brand.name);
                          yumbutton.attr('data-color', response.products[i].colors["0"].name);
                          } catch(e){}
                          nastybutton.attr('data-id', response.products[i].id);
                          nastybutton.attr('data-url', response.products[i].clickUrl);
                          nastybutton.attr('data-name', response.products[i].name);
                          try {
                          nastybutton.attr('data-material', response.products[i].name);
                          nastybutton.attr('data-style', style);
                          nastybutton.attr('data-brand', response.products[i].brand.name);
                          nastybutton.attr('data-color', response.products[i].colors["0"].name);
                          } catch(e){}
                
                
                          pictureDiv.append(Image);
                          pictureDiv.append(p);
                          pictureDiv.append(yumbutton);
                          pictureDiv.append(nastybutton);
                
                
                        $('#pictureView').prepend(pictureDiv);
                
                        };
                        $('.yumbutton').on('click', function(event){
                           var item = {
                              productid: $(this).data('id'),
                              url: $(this).data('url'),
                              name: $(this).data('name'),
                              liked: true,
                              material: $(this).data('material'),
                              style: $(this).data('style'),
                              color: $(this).data('color'),
                              brand: $(this).data('brand'),
              
                           }
                           getItem(item);
                        console.log($(this).data('id'));
                            $.post('/api/products', item)
                            .done(function(data){
                             console.log(data);
                             console.log(item);
                      });
                       });
                        $('.nastybutton').on('click', function(event){
                          var item= {
                              productid: $(this).data('id'),
                              url: $(this).data('url'),
                              name: $(this).data('name'),
                              liked: false,
                              material: $(this).data('material'),
                              style: $(this).data('style'),
                              color: $(this).data('color'),
                              brand: $(this).data('brand'),
              
                            }
                        getItem(item);
                        console.log(item);
                            $.post('/api/products', item)
                            .done(function(data){
                             console.log(data);
                             console.log(item);
                        });
                      });
                        });
                      };
                
  function clearPicture(){
    $('#pictureView').empty();
  }
  // History Modal //

  function history() {
    
            console.log("WORKING");
    
              $('#id02').show();
    
              $('#product').empty();
              $('#colorTags').empty();
              $('#materialTags').empty();
              $('#styleTags').empty();
    
    
          productHistoryList();
          tagsHistoryList();
    
          function productHistoryList() {
            $.get("/api/products", function(data) {
                for (let i = 0; i < data.length; i++) {
                    let historyList = $('#product');
                    let productNo = data[i].productid;
                    let buyURL = data[i].url;
                    let goBuy = "<a href='" + buyURL + "'>BUY</a>";
                    let name = data[i].name;
                    let want;
    
                          console.log('things are happening');
                    if (data[i].liked) {
                        want = "YUM ;^D"
                    }
                    else {
                        want = "NASTY D^;"
                    };
    
                    // Append div-div-div break, move to next in loop
                    historyList.append("<div class='histlist mH' 'historyBox' id='menu'+ i>" + 
                    name + 
                    "　｜｜　" + goBuy + "　｜｜　" + 
                    want
                    + "<div></br>");
    
    
                }
            });
          };
    
          function tagsHistoryList() {
            $.get("/api/products", function(data) {
    
              let colorTagsObject = {};
              let materialTagsObject = {};
              let styleTagsObject = {};
              let colorTagsArraySorted = [];
              let materialTagsArraySorted = [];
              let styleTagsArraySorted = [];
              let colorTagsToPage = [];
              let materialTagsToPage = [];
              let styleTagsToPage = [];
    
              for (let i = 0; i < data.length; i++) {
                let colorTagsList = $('#colorTags');
                let materialTagsList = $('#materialTags');
                let styleTagsList = $('#styleTags');
                let colorTags = data[i].color;
                let materialTags = data[i].material;
                let styleTags = data[i].style;
                let feeling;
                let faceIt;
    
                let colorTagsArray = colorTags.split(',');
                console.log(colorTagsArray);
                let materialTagsArray = materialTags.split(',');
                console.log(materialTagsArray);
                let styleTagsArray = styleTags.split(',');
                console.log(styleTagsArray);
    
                // ￥Pushing into empty objects and associating values to them￥
                if (data[i].liked) {           
                  for (let i = 0; i < colorTagsArray.length; i++) {
                    if (!colorTagsObject[colorTagsArray[i]]) {
                      colorTagsObject[colorTagsArray[i]] = 1;
                    }
                    else {
                      colorTagsObject[colorTagsArray[i]] += 1;
                    }
                    console.log(colorTagsObject);
                  };
    
                  for (let i = 0; i < materialTagsArray.length; i++) {
                    if (!materialTagsObject[materialTagsArray[i]]) {
                      materialTagsObject[materialTagsArray[i]] = 1;
                    }
                    else {
                      materialTagsObject[materialTagsArray[i]] += 1;
                    }
                    console.log(materialTagsObject);
                  };
    
                  for (let i = 0; i < styleTagsArray.length; i++) {
                    if (!styleTagsObject[styleTagsArray[i]]) {
                      styleTagsObject[styleTagsArray[i]] = 1;
                    }
                    else {
                      styleTagsObject[styleTagsArray[i]] += 1;
                    }
                    console.log(styleTagsObject);
                  };          
                }
    
                else {
                  for (let i = 0; i < colorTagsArray.length; i++) {
                    if (!colorTagsObject[colorTagsArray[i]]) {
                      colorTagsObject[colorTagsArray[i]] = -1;
                    }
                    else {
                      colorTagsObject[colorTagsArray[i]] -= 1;
                    }
                    console.log(colorTagsObject);
                  };
    
                  for (let i = 0; i < materialTagsArray.length; i++) {
                    if (!materialTagsObject[materialTagsArray[i]]) {
                      materialTagsObject[materialTagsArray[i]] = -1;
                    }
                    else {
                      materialTagsObject[materialTagsArray[i]] -= 1;
                    }
                    console.log(materialTagsObject);
                  };
    
                  for (let i = 0; i < styleTagsArray.length; i++) {
                    if (!styleTagsObject[styleTagsArray[i]]) {
                      styleTagsObject[styleTagsArray[i]] = -1;
                    }
                    else {
                      styleTagsObject[styleTagsArray[i]] -= 1;
                    }
                    console.log(styleTagsObject);
                  };
                }; // ・Objects populated・
    
                // Sorts and returns nested array in descending numerical order
                sortByProp(colorTagsObject, colorTagsArraySorted);
                sortByProp(materialTagsObject, materialTagsArraySorted);
                sortByProp(styleTagsObject, styleTagsArraySorted);
    
                for (let i = 0; i < colorTagsArray.length; i++) {
                  colorTagsToPage.push(colorTagsArray[i]);
                  console.log(colorTagsToPage);
                };
                for (let i = 0; i < materialTagsArray.length; i++) {
                  materialTagsToPage.push(materialTagsArray[i]);
                  console.log(materialTagsToPage);
                };
                for (let i = 0; i < styleTagsArray.length; i++) {
                  styleTagsToPage.push(styleTagsArray[i]);
                  console.log(styleTagsToPage);
                };
                
                console.log('This is happening');
                if (data[i].liked) {
                  feeling = "I love it?? ( ͡° ͜ʖ ͡°)";
                  faceIt = "(((o(*ﾟ▽ﾟ*)o)))";
                }
                else {
                  feeling = "Not for me?? _(┐「ε:)_";
                  faceIt = "(￣^￣)";
                };
    
                // let goto = colorTagsToPage[i];
                // let word = colorTagsList.innerHTML.indexOf(goto);
              
              //  if (!word) {
              
                  colorTagsList.append("<div class='taglist mH' 'historyBox' id='menu'+ i>" + 
                  colorTagsToPage[i] + 
                  "　・　" + faceIt + "　・　" + 
                  feeling +
                  "<div></br>");
    
                  materialTagsList.append("<div class='taglist mH' 'historyBox' id='menu'+ i>" + 
                  materialTagsToPage[i] + 
                  "　・　" + faceIt + "　・　" + 
                  feeling +
                  "<div></br>");
                  
                  styleTagsList.append("<div class='taglist mH' 'historyBox' id='menu'+ i>" + 
                  styleTagsToPage[i] + 
                  "　・　" + faceIt + "　・　" + 
                  feeling +
                  "<div></br>");
               // }
                  
                
              }
            });
          };
      };
    
          $('#uhbtn').on('click', function(event){
            history();
          });
    
          var i=0;
          $('.mH').each(function(){
              i++;
              var newID='menu'+i;
              $(this).attr('id',newID);
              $(this).val(i);
          });
    
    
        function remove(link) {
          link.parentNode.parentNode.removeChild(link.parentNode);
        };
    
    
    // Material Search and Style Search Functions //
    function materialSearch(description){ 
      var matches = [];
      var str = description;
      var materialArray = ['leather', 'cotton', 'flax', 'wool', 'ramie', 'silk', 'denim', 'down',
      'fur', 'nylon', 'polyester', 'spandex', 'flannel', 'acetate', 'polyester', 'Rayon', 'PVC'];
      materialArray.forEach(function(entry) {
      var m = entry;
      var regex = new RegExp(m, 'g');
      var res = str.match(regex);
      if (res !== null) {
        matches.push(res)
      }
      });
      return matches;
      };
    function styleSearch(description) {
        var matches = [];
        var str = description;
        // 180 style tags evaluated
        var styleArray = ['classic', 'glam', 'boho', 'bohomeian', 'casual', 'edgy', 'preppy', 'minimalist', 'romantic',
          'peacoat', 'blazer', 'biker', 'bolero', 'trench coat', 'wrap coat', 'swing coat', 'babydoll', 'military', 'blouson', 'band jacket',
          'zip up hoodie', 'denim jacket', 'parka', 'puffer', 'cardigan', 'cape', 'poncho', 'shift', 'a-line', 'sheath', 'bodycon',
          'tent', 'empire', 'strapless', 'halter dress', '1-Shoulder', 'apron dress', 'jumper dress', 'sun dress', 'wrap dress', 'pouf', 'slip dress',
          'Qi Pao', 'Shirt Dress', 'Maxi', 'Ball Gown', 'Straight', 'Pencil', 'A Line', 'Pegged', 'Slit', 'Cowl', '8 Panel Gore', 'Godet', 'Flounce',
          'Trumpet', 'Pleat', 'Prarie', 'Layered', 'Tulle', 'Round', 'Handkercheif', 'Wrap', 'Pareo', 'Sarong', 'Skinny', 'Boot-Cut',
          'Flare', 'Wide Leg', 'Pegged', 'Stirrup', '5 Pocket Jeans', 'Bush Pants', 'Cargo', 'Sailor', 'Jodhpurs', 'Hot Pants', 'Short Shorts', 'Short-Shorts',
          'Skort', 'Sweat Pants', 'Harem', 'Palazzo', 'Carpenter', 'Jumpsuit', 'Princess Vest', 'Blouse', 'Shirt', 'Western', 'Pin Tuck', 'Tuxedo', 'Ruffle Front',
          'Cossack', 'Smock', 'Peplum', 'Gypsy', 'Tunic', 'polo', 'henley', 'turtleneck', 'sweatshirt', 'sweater',
          'chanel bag', 'barrel', 'duffel', 'bowling', 'satchel', 'tote', 'hobo', 'messenger', 'saddle', 'wash bag',
          'minaudiere', 'clutch', 'wristlet', 'bucket', 'backpack', 'pump', 'mary jane', 't-strap', 'ankle strap', 'mule',
          'clog', 'ghille', 'sandal', 'espadrille', 'saddle', 'wing tip', 'ballerina', 'mocassin', 'deck', 'loafer', 'penny loafer', 'sneaker', 'flip flop',
          'boot', 'jockey', 'snow', 'boa', 'ankle', 'one-piece', 'tankini', 'two-piece', 'bikini', 'tank', 'slip', 'bodysuit',
          'bra top', 'bra', 'bustler', 'girdle', 'g-string', 'brief', 'tanga', 'boyshorts', 'bow tie', 'ascot tie', 'necklace', 'ring', 'braclet',
          'tie', 'shawl', 'scarf', 'string', 'fitness', 'apron', 'cape', 'ball gown', 'blouse', 'capris', 'cycling', 'sundress',
          'onesie', 'yoga', 'slim-fit', 'jumpsuit', 'miniskirt', 'safari', 'vintage', 'grunge', 'punk', 'hipster', 'revival', 'cap',
          'fedora', 'helmet', 'hood', 'turban', 'veil', 'scrubs', 'cut off', 'ripped', 'distressed', 'hoodie', 'poncho', 'short-sleeve', 'long-sleeve',
          'sunglasses', 'tights', 'robe', 'pajama'];
        styleArray.forEach(function(entry){
        var s = entry;
        var regex = new RegExp(s, 'g');
        var res = str.match(regex);
        if (res !== null) {
          matches.push(res[0])
        }
      });
      return matches;
    };
    
    // getItem();
    
    function getItem(x) {
      var item = x;
      console.log(item);
    
      let material = x.material.split(",");
      let style = x.style.split(",");
      console.log(style);
      let color = x.color;
      console.log(color);
      let brand = x.brand;
      console.log(brand);
      let liked = x.liked;
      console.log(liked);
      
      // Logic to add product attributes to dynamic object/array box: material, style, colour, brand. 
      // Each tag is another object. Each value is zero.
      // Cycle through the box, and sync with the current product attributes
      // Based on yum or nasty, -1 or +1 to each key:value
      // Update history of the products table in the database by adding or subtracting the -1 or +1
      
    
    }
    
    function sortByProp(obj, emptyArray) {
      let sortMe = [];
      for (var key in obj)
        if (obj.hasOwnProperty(key))
          sortMe.push([key, obj[key]]);
      
      sortMe.sort(function(a, b)
      {
        return a[1]-b[1];
      });
      console.log(sortMe); // Arrays nested in array format
      emptyArray = sortMe.reverse();
      console.log(emptyArray);
    }
    
    ///////////////////////////////////////////////////// TAGS TABLE BELOW /////////////////////////////////////////////////////////////////////////
    
    