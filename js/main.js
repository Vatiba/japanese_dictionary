var words = wordsTKM;

function drawDictionaryWords(index){
    let text = $(".elastic");
    text.empty();
    if(typeof index !== "undefined"){
        if(index.length > 0){
    		for (var i = 0; i < index.length; i++) {
                var result = words[index[i]]["word"] + " - " + words[index[i]]["hir"] + " - " + words[index[i]]["translate"];

                text.append("<tr><td class='tr border'>" + result + "<div class='float-right'>" + starFindSelect(result) + "<i class='fas fa-volume-up select-volume-up float-right p-0 pl-2 pt-1 star-default'></i>" + "</div>" + "</td></tr>");
                soundFindSelect(words[index[i]]);
            }
        }
        else if(index.length == 0){
            drawNothingFound(text);
        }
        else{
            for (var i = 0; i < 50; i++) {
                result =  words[i]["word"] + " - " + words[i]["hir"] + " - " + words[i]["translate"];

                text.append("<tr><td class='tr border'>" + result + "<div class='float-right'>" + starFindSelect(result) + "<i class='fas fa-volume-up select-volume-up float-right p-0 pl-2 pt-1 star-default'></i>" + "</div>" + "</td></tr>");
            	soundFindSelect(words[i]);
            }
        }
    }
    else{
        for (var i = 0; i < 50; i++) {
            result =  words[i]["word"] + " - " + words[i]["hir"] + " - " + words[i]["translate"];

            text.append("<tr><td class='tr border'>" + result + "<div class='float-right'>" + starFindSelect(result) + "<i class='fas fa-volume-up select-volume-up float-right p-0 pl-2 pt-1 star-default'></i>" + "</div>" + "</td></tr>");
            soundFindSelect(words[i]);
        }
    }
    starSelectDictionary();
}

function drawNothingFound(content){
    content.append("<h6 class='text-center pt-3'>Siziň ýazan sözüňiz ýok</h6>");
}



function drawFavoritesWords(){
    let text = $(".elastic").empty();
    var result = [];
    var result1 = [];
    for (var i = 0; i < words.length; i++) {        
        if(localStorage.getItem(words[i]["word"] + " - " + words[i]["hir"] + " - " + words[i]["translate"]) == null){
            continue;
        }
        else{
            result.push(localStorage.getItem(words[i]["word"] + " - " + words[i]["hir"] + " - " + words[i]["translate"]));
            result1.push(words[i]);
        }
    }

    for (var x = 0; x < result.length; x++){
        text.append("<tr><td class='tr border'>" + result[x] + "<div class='float-right'>" + starFindSelect(result[x]) + "<i class='fas fa-volume-up select-volume-up float-right p-0 pl-2 pt-1 star-default'></i>" + "</div>" + "</td></tr>")
    	soundFindSelect(result1[x]);
    }
    starSelectFavorites()
}

function starFindSelect(content){
    storageContent = localStorage.getItem(content);
	if(typeof storageContent !== "undefined"){
		result = storageContent;
	}
	else{
		"<i class='fas fa-star p-0 pt-1 star-default star-select'></i>"
	}
	if(result == content){
		return "<i class='fas fa-star p-0 pt-1 star-yellow star-select'></i>";
	}
	else{
		return "<i class='fas fa-star p-0 pt-1 star-default star-select'></i>";
	}
}

function soundFindSelect(word){
	$(".select-volume-up").click(function(){
		var wordInnertext = $(this).parent().parent()["0"]["innerText"];

		var result = word["word"] + " - " + word["hir"] + " - " + word["translate"];

		if(wordInnertext == result){
            var sound = new Audio();
            sound.src = "sound/" + word["sound"] + ".mp3";
            sound.play();
		}
	})
}

String.prototype.toUpperFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function searchInput(value){

    if(value == "undefined"){
        document.querySelector('#elastic').oninput = function(){
            var valLowerCase = this.value.trim().toLowerCase();
            var valUpperCase = valLowerCase.toUpperFirstLetter();
            var index = [];
            if(valLowerCase != ''){
                for (var i = 0; i < words.length; i++) {
                    word = words[i]["hir"] + "-" + words[i]["translate"];
                    if(word.search(valLowerCase) == -1){
                        if(word.search(valUpperCase) == -1){
                            continue;
                        }
                        else if(index.length > 10){
                            break;
                        }
                        else{
                            index.push(i);
                        }
                    }
                    else if(index.length > 10){
                        break;
                    }
                    else{
                        index.push(i);
                    }
                }
                drawDictionaryWords(index);
            }
            else{
                drawDictionaryWords(-1);
            }
        }
    }
    else{
        var valLowerCase = $("#elastic")["0"].value.trim().toLowerCase();
        var valUpperCase = valLowerCase.toUpperFirstLetter();
        var index = [];
        if(valLowerCase != ''){
            for (var i = 0; i < words.length; i++) {
                word = words[i]["hir"] + "-" + words[i]["translate"];
                if(word.search(valLowerCase) == -1){
                    if(word.search(valUpperCase) == -1){
                        continue;
                    }
                    else if(index.length > 10){
                        break;
                    }
                    else{
                        index.push(i);
                    }
                }
                else if(index.length > 10){
                    break;
                }
                else{
                    index.push(i);
                }
            }
            drawDictionaryWords(index);
        }
        else{
            drawDictionaryWords(-1);
        }
    }

}

function drawDictionary(){
	$("body").empty();
	$("body").append('<div class="bg-secondary pb-3 pt-2"><div class="container"><button id="tkm" class="btn btn-outline-light" style="font-weight: 700; width: 33.333%">JP <i class="fas fa-angle-right"></i> TM</button><button id="ru" class="btn btn-outline-light" style="font-weight: 700; width: 33.333%">JP <i class="fas fa-angle-right"></i> RU</button><button id="en" class="btn btn-outline-light" style="font-weight: 700; width: 33.333%">JP <i class="fas fa-angle-right"></i> EN</button><div class="text-center pt-2"><button id="diсtionary" class="btn btn-outline-light active pr-1 w-50" style="font-weight: 700;">Sözlük</button><button id="favorites" class="btn btn-outline-light pl-1 w-50" style="font-weight: 700;">Saýlanan</button></div><div class="input-group pt-2"><div class="input-group-text border-0 bg-white rounded-0"><div class="input-group-prepend"><i class="fas fa-search"></i></div></div><input spellcheck="false" id="elastic" class="form-control border-0 rounded-0" type="search" placeholder="Search" aria-label="Search"></div></div></div><div class="container"><i id="aboutUs" class="fas fa-exclamation-circle position-fixed text-secondary" style="font-size: 3rem; bottom: 10px; right: 10px; "></i><div class="pt-3 words-dictionary"></div></div>')
    $(".words-dictionary").empty();
    $(".words-dictionary").append("<table class='table elastic'></table>");
    drawDictionaryWords();
    searchInput("undefined");

	$("#aboutUs").click(function(){
		$("body").empty();
		$("body").append('<div class="container"><h4 class="text-center pt-3">Programmany düzenler :</h4><h4 class="text-center pt-2">Ýaýlymow Bezirgen</h4><h4 class="text-center">Rozmetow Timur</h4><h4 class="text-center pt-3">Biz bilen habarlaşmak:</h4><h5 class="text-center pt-3"><a href="http://eetengtense@gmail.com">eetengtense@gmail.com</a></h5><i id="back" class="fas fa-arrow-left position-fixed" style="font-size: 3rem; bottom: 10px; right: 10px;"></i></div>')


		$("#back").click(function(){
			console.log(1)
			drawDictionary();
		});
	});
	$("#favorites").click(function() {
		$("#diсtionary").removeClass("active");
		$(this).addClass("active");
		drawFavorites();
	});

	$("#elastic").click(function(){
		if($("#diсtionary").hasClass("active") == false){
			$("#favorites").removeClass("active");
			$("#diсtionary").addClass("active");
			drawDictionaryWords(-1);
		}
	});

	$("#tkm").click(function(){
	    $("#ru").removeClass("active");
	    $("#en").removeClass("active");
	    $(this).addClass("active");

	    // $("#elastic")["0"].value = '';

		$("#favorites").removeClass("active");
		$("#diсtionary").addClass("active");
		words = wordsTKM;
	    drawDictionaryWords(-1);
        searchInput(1);
	});
	$("#ru").click(function(){
	    $("#en").removeClass("active");
	    $("#tkm").removeClass("active");
	    $(this).addClass("active");

	    // $("#elastic")["0"].value = '';

		$("#favorites").removeClass("active");
		$("#diсtionary").addClass("active");
	    words = wordsRU;
	    drawDictionaryWords(-1);
        searchInput(1);
	});
	$("#en").click(function(){
	    $("#ru").removeClass("active");
	    $("#tkm").removeClass("active");
	    $(this).addClass("active");

	    // $("#elastic")["0"].value = '';

		$("#favorites").removeClass("active");
		$("#diсtionary").addClass("active");
	    words = wordsEN;
	    drawDictionaryWords(-1);
        searchInput(1);
	});

    // For counting words in dictionary use this script

    // var count = 0;
    // // for (var x = 0; x < words.length; x++){
    // //  if(words[x]["hir"] != "")
    // //      count++;
    // //  else
    // //      continue;
    // // }

    // for (var x = 0; x < words.length; x++){
    //     count++;
    // }

    // console.log(count);
}

function drawFavorites(){
    $(".words-dictionary").empty();
    $(".words-dictionary").append("<table class='table elastic'></table>");
    drawFavoritesWords();
    searchInput("undefined");

	$("#diсtionary").click(function() {
		$("#favorites").removeClass("active");
		$(this).addClass("active");
		drawDictionary();
	});
}


function starSelectDictionary() {
    $(".star-select").click(function() {
        word = $(this).parent().parent()["0"]["innerText"];

        if($(this).hasClass("star-yellow")){
            $(this).removeClass("star-yellow");
            $(this).addClass("star-default");

            localStorage.removeItem(word);
        }
        else{
            $(this).addClass("star-yellow");
            $(this).removeClass("star-default");

            localStorage.setItem(word, word);
        }
    });
}

function starSelectFavorites() {
    $(".star-select").click(function() {
        word = $(this).parent().parent()["0"]["innerText"];

        if($(this).hasClass("star-yellow")){
            $(this).removeClass("star-yellow");
            $(this).addClass("star-default");

            $(this).parent().parent()["0"].classList.add("d-none");
            localStorage.removeItem(word);

        }
    });
}

drawDictionary();




