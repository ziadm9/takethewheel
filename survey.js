function refreshSliders(state){
    if(state=="1"){
        categories = document.querySelectorAll(".category")
    }
    else{
        categories = document.querySelectorAll(".category2")
    }
    
   
   
    for(i = 0; i < categories.length; i++) {
        category = categories[i]
        slider = category.children[1]
        closeButton = category.children[0].children[1]
        slider.oninput = change(i, state)
        closeButton.onclick = close(i, state)
    }
    
}


function change(i, state) {
 return function() {
    if(state=="1"){
        categories = document.querySelectorAll(".category")
    }
    else{
        categories = document.querySelectorAll(".category2")
    }
    category=categories[i]
    slider = category.children[1]
    num = category.children[0].children[0].children[1]
    num.innerHTML = `: ${slider.value}`
 }
}

function close(i, state) {
    return function() {
        console.log("fired")
        if(state=="1"){
            categories = document.querySelectorAll(".category")
        }
        else{
            categories = document.querySelectorAll(".category2")
        }
       if(categories.length>1){
            category=categories[i]
            while (category.hasChildNodes()){
                category.removeChild(category.firstChild)
            }  
            category.remove()
       }
       refreshSliders(state)
    }
}

refreshSliders("1")
addButton = document.getElementById("addButton")
nextButton = document.getElementById("surveyNext")
addButton2 = document.getElementById("addButton2")
nextButton2 = document.getElementById("surveyNext2")
homeButton = document.getElementById("homeButton")

homeButton.onclick=(event)=>{
    event.preventDefault()
    window.location.href="home.html"
}

addButton.onclick=(event)=>{
    event.preventDefault()
    add("1")
}

addButton2.onclick=(event)=>{
    event.preventDefault()
    add("2")
}

function add(state){
    if(state=="1"){
        addInput = document.getElementById("newCategoryInput")
        categories = document.querySelectorAll(".category")
        categoryBox = document.getElementById("categories")
    }
    else{
        addInput = document.getElementById("newCategoryInput2")
        categories = document.querySelectorAll(".category2")
        categoryBox = document.getElementById("categories2")
    }
    if(addInput.value.trim()){
        sampleCategory=categories[0]
        newCategory = sampleCategory.cloneNode(true);
        newCatHeader = newCategory.children[0].children[0].children[0]
        newCatHeader.innerHTML = addInput.value
        newCategory.id = addInput.value.replaceAll(".","_").replaceAll("#","_").replaceAll("$","_").replaceAll("/","_").replaceAll("[","_").replaceAll("]","_")
        categoryBox.appendChild(newCategory)
        addInput.value=""
        refreshSliders(state)
    }
}

nextButton.onclick=(event)=>{
    event.preventDefault()
    send("1")
}

nextButton2.onclick=(event)=>{
    event.preventDefault()
    send("2")
}

function send(page){
    if(page=="1"){
        categories = document.querySelectorAll(".category")
        target = '/positivePreferences'
    }
    else{
        categories = document.querySelectorAll(".category2")
        target = '/negativePreferences'
    }
    data={}
    for(i = 0; i < categories.length; i++) {
        category = categories[i]
        categoryName = category.id
        sliderVal = category.children[1].value
        data[categoryName] = sliderVal
    }
    user = localStorage.getItem("username")
    database.ref(user+target).set(data).then(()=>{
        if(page=="1"){
            document.getElementById("surveyBox").style.display = "none"
            document.getElementById("surveyNext").style.display = "none"
            document.getElementById("getStart2").innerHTML= "Think about a few things in your life that you feel like you're wasting time on or spending too much time on. Rate how much of an impact these things have on your time and your life."
            document.getElementById("surveyBox2").style.display = "flex"
            document.getElementById("surveyNext2").style.display = "flex"
            refreshSliders("2")
        }
        else{
            document.getElementById("surveyBox2").style.display = "none"
            document.getElementById("surveyNext2").style.display = "none"
            document.getElementById("getStart1").style.display = "none"
            document.getElementById("getStart2").style.display = "none"
            document.getElementById("getStart3").style.display = "none"
            document.getElementById("welcomeBox").style.display = "flex"
            document.getElementById("welcomeHead").style.display = "flex"
            database.ref(user+'/status').set({surveyed: true})
        }
    })   
}



