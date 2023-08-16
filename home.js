wheel = document.getElementById("wheel")
const delay = ms => new Promise(res => setTimeout(res, ms));
value = 3600
wheelSpinning = false
user = localStorage.getItem("username")
let posObject
let negObject
database.ref(user+'/positivePreferences').once('value').then((snapshot)=>{ 
    posObject=snapshot.val()
})
database.ref(user+'/negativePreferences').once('value').then((snapshot)=>{ 
    negObject=snapshot.val()


wheel.onclick=async (event)=>{
    event.preventDefault()
    if(!wheelSpinning){
        wheelSpinning = true
        wheel.style.transform = "rotate(" + value + "deg)"
        value+=3600
        if(Math.floor(Math.random()*10)==0){
            total=0
            chanceList=[]
            for(cat in negObject){
                total+=Number(negObject[cat])
                for(i=0;i<negObject[cat];i++){
                    chanceList.push(cat)
                }
            }
            console.log(chanceList)
            console.log(chanceList[Math.floor(Math.random()*total)])
        }
        else{
            total=0
            chanceList=[]
            for(cat in posObject){
                total+=Number(posObject[cat])
                for(i=0;i<posObject[cat];i++){
                    chanceList.push(cat)
                }
            }
            
            thing = chanceList[Math.floor(Math.random()*total)]
        }
        document.getElementById("wheelBelow").innerHTML = "Spinning..."
        await delay(8000)
        document.getElementById("wheelBelow").innerHTML = `Spend some time on: ${thing}`
        wheelSpinning = false
    }
    
}

    
    
   
    })