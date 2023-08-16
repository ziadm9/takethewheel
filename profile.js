const logoutButton = document.getElementById("logout")
logoutButton.onclick = (event) =>{
    event.preventDefault()
    localStorage.setItem("loggedIn", null)
    localStorage.setItem("username", null)
    window.location.href="index.html"
}

document.getElementById("surveyBox2").style.display = "flex"
document.getElementById("surveyBox2").style.width = "100%"
document.getElementById("surveyBox2").style.height = "35%"
document.getElementById("surveyBox").style.width = "100%"
document.getElementById("surveyBox").style.backgroundColor = "#293d74"
document.getElementById("surveyBox2").style.backgroundColor = "#293d74"
document.getElementById("surveyBox").style.height = "35%"
document.getElementById("categories").style.width = "80%"
document.getElementById("newCategory").style.width = "76%"
document.getElementById("categories2").style.width = "80%"
document.getElementById("newCategory2").style.width = "76%"
document.getElementById("backarrow").onclick=(event)=>{
    event.preventDefault()
    window.location.href="home.html"
}
user = localStorage.getItem("username")
document.getElementById("profileHeader").innerHTML = `Logged in as: ${user}`
    database.ref(user+'/positivePreferences').once('value').then((snapshot)=>{ 
       count = 0
       categories = document.querySelectorAll(".category")
       target = snapshot.val()
       for (cat in target){
        if(count==0){
            sampleCat = categories[0]
            sampleHead = sampleCat.children[0].children[0].children[0]
            sampleNum = sampleCat.children[0].children[0].children[1]
            sampleInput = sampleCat.children[1]
            sampleHead.innerHTML = cat
            sampleCat.id = cat
            sampleNum.innerHTML = `: ${target[cat]}`
            sampleInput.value = target[cat]
        }
        else{
            sampleCategory = categories[0]
            categoryBox = document.getElementById("categories")
            newCategory = sampleCategory.cloneNode(true);
            newCatHeader = newCategory.children[0].children[0].children[0]
            newCatNum = newCategory.children[0].children[0].children[1]
            newCatInput = newCategory.children[1]
            newCatHeader.innerHTML = cat
            newCatNum.innerHTML = `: ${target[cat]}`
            newCatInput.value = target[cat]
            newCategory.id = cat
            categoryBox.appendChild(newCategory)
        }
        count+=1
       }
       database.ref(user+'/negativePreferences').once('value').then((snapshot)=>{ 
        count = 0
        categories = document.querySelectorAll(".category2")
        target = snapshot.val()
        for (cat in target){
         if(count==0){
             sampleCat = categories[0]
             sampleHead = sampleCat.children[0].children[0].children[0]
             sampleNum = sampleCat.children[0].children[0].children[1]
             sampleInput = sampleCat.children[1]
             sampleHead.innerHTML = cat
             sampleCat.id = cat
             sampleNum.innerHTML = `: ${target[cat]}`
             sampleInput.value = target[cat]
         }
         else{
             sampleCategory = categories[0]
             categoryBox = document.getElementById("categories2")
             newCategory = sampleCategory.cloneNode(true);
             newCatHeader = newCategory.children[0].children[0].children[0]
             newCatNum = newCategory.children[0].children[0].children[1]
             newCatInput = newCategory.children[1]
             newCatHeader.innerHTML = cat
             newCatNum.innerHTML = `: ${target[cat]}`
             newCatInput.value = target[cat]
             newCategory.id = cat
             categoryBox.appendChild(newCategory)
         }
         count+=1
        }
        refreshSliders("1")
        refreshSliders("2")
     })
    })
    

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
    
   
    addButton = document.getElementById("addButton")
    addButton2 = document.getElementById("addButton2")
    saveChanges = document.getElementById("saveChanges")
    
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
    
    saveChanges.onclick=(event)=>{
        event.preventDefault()
        send()
    }
    
    function send(){
            user = localStorage.getItem("username")
            categories = document.querySelectorAll(".category")
            target = '/positivePreferences'
            data={}
        for(i = 0; i < categories.length; i++) {
            category = categories[i]
            categoryName = category.id
            sliderVal = category.children[1].value
            data[categoryName] = sliderVal
        }
        database.ref(user+target).set(data).then(()=>{
            categories = document.querySelectorAll(".category2")
            target = '/negativePreferences'
            data={}
            for(i = 0; i < categories.length; i++) {
                category = categories[i]
                categoryName = category.id
                sliderVal = category.children[1].value
                data[categoryName] = sliderVal
            }
            database.ref(user+target).set(data)
        })

    }
    
    
    
    