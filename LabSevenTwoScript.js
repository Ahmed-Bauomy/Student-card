//student class
var unique=0;
function Student(name,grade,department){
this.studentName=name;
this.studentGrade=grade;
this.department=department;
this.unique=unique++;
}
//print row function
function printRow(studentObj){
   var newRow=document.createElement("tr"); //the new row
    newRow.title=studentObj.unique;    //set unique to title of row
   for(i in studentObj){
   //background color
   if(studentObj[i]=="SD"){
      newRow.style.backgroundColor="pink";
      break;
   }else if(studentObj[i]=="OS"){
    newRow.style.backgroundColor="lightYellow";
    break;
   }else if(studentObj[i]=="EL"){
    newRow.style.backgroundColor="lightGreen";
    break;
   }
   var newColum= document.createElement("td");
   newColum.innerText=studentObj[i];
   newRow.append(newColum);
   }
   //delete button in new colum
   var deleteColum=document.createElement("td");
   deleteColum.innerHTML="<input type='button' value='DELETE'>";
   newRow.append(deleteColum);
   var secondTable=document.querySelectorAll("table")[1];
   secondTable.append(newRow);
}
var studentArray=[];
var filteredArrayF=[];
var filteredArrayP=[];
window.addEventListener("load",function(){
//radio buttons and the text fields
var radioButtons=document.querySelectorAll("input[type='radio']");
var studentNameTxt=document.querySelector("input[name='studentName']");
var studentGradeTxt=document.querySelector("input[name='studentGrade']");
var addButton=document.querySelector("input[value='add']");

//add button
addButton.onclick=function(){
    for(i=0;i<radioButtons.length;i++){
       if(radioButtons[i].checked){
           var department=radioButtons[i].value;
       }
    }
    var studentObj=new Student(studentNameTxt.value,studentGradeTxt.value,department);
    studentArray.push(studentObj);
    printRow(studentObj);
}
//delete button
document.querySelectorAll("table")[1].onclick=function(event){
           if(event.target.localName=="input"){
               event.target.parentElement.parentElement.remove();
               //update the title
               for(let i=0; i<document.querySelectorAll("table")[1].rows.length;i++){
                document.querySelectorAll("table")[1].rows[i].title=`${i}`;
               }
               studentArray.splice(parseInt(event.target.parentElement.parentElement.title),1);
              // console.log(event.target.parentElement.parentElement.title);
           }
       
}
var optionsList=document.querySelector("select");

optionsList.onchange=function(){
    if(this.value=="All"){              //All 
    console.table(studentArray);
    // clear the table
       /* document.querySelectorAll("table")[1].childNodes.forEach(function(child){
             console.log(document.querySelectorAll("table")[1].removeChild(child));
        });*/
        document.querySelectorAll("table")[1].innerHTML="";
     for(let i=0;i<studentArray.length;i++){
         printRow(studentArray[i]);
     }
    }else if(this.value=="Passed"){       //passed
         filteredArrayP=studentArray.filter(function(obj){
           return parseInt(obj.studentGrade)>=60;
   });
   console.table(filteredArrayP);
   // clear the table
  /* document.querySelectorAll("table")[1].childNodes.forEach(function(child){
    document.querySelectorAll("table")[1].removeChild(child);
});*/
document.querySelectorAll("table")[1].innerHTML="";
   for(let i=0;i<filteredArrayP.length;i++){
      printRow(filteredArrayP[i]);
  }

    }else if(this.value=="Failed"){         //failed
        filteredArrayF=studentArray.filter(function(obj){
          return  parseInt(obj.studentGrade)<60;
    });
    console.table(filteredArrayF);
    // clear the table
   /* document.querySelectorAll("table")[1].childNodes.forEach(function(child){
        document.querySelectorAll("table")[1].removeChild(child);
   });*/
   document.querySelectorAll("table")[1].innerHTML="";
    for(let i=0;i<filteredArrayF.length;i++){
      printRow(filteredArrayF[i]);
    }
    }
}










});//end of load event