//======================================================================
//定義群
//======================================================================
//ページの変更
const Anki = document.getElementById("anki")
const Explain = document.getElementById("explain")
const CreateDestroy = document.getElementById("create-destroy")
const AnkiButton = document.getElementById("anki-button")
const ExplainButton = document.getElementById("explain-button")
const CreateDestroyButton = document.getElementById("create-destroy-button")
//定義
const SeeAnswer = document.getElementById("see-answer")
const Answer = document.getElementById("answer")
const AnswerBox = document.getElementById("answer-box")
const Question = document.getElementById("question")
const NextQuestion = document.getElementById("next-question")
const PrevQuestion = document.getElementById("prev-question")
const FinishScreen = document.getElementById("finish-screen")
const CheckCard = document.getElementById("check-card")
//セット関係の定義
const GroupSelect = document.getElementById("group-select")
const AllOrImportantSelect = document.getElementById("all-or-important-select")

//全てor重要関係の定義
const SelectAll = document.getElementById("select-all")
const SelectChecked = document.getElementById("select-checked")

//カードの定義
const Card = document.querySelector(".card")

//画像関係の定義
const NewQuestionImage = document.getElementById("new-question-image")
let NewQuestionImageData = null

const ResetNewQuestionImage = document.getElementById("reset-new-question-image")
const QuestionImage = document.getElementById("question-image")



//=====================================================================
//管理
//=====================================================================
//カード管理
let CardNumber = 0;

//セットの定義
const GroupList = document.getElementById("group-list")
//セットの定義
let groups = [
    {
        name:"気象",
        id:"group-00",
        questions:[
            {
                question:"地表(高度0km)から高度約11kmの層",
                answer:"対流圏",
                checked:false,
                image:null
            },
            {
                question:"オゾン層が存在し、紫外線を吸収する層",
                answer:"成層圏",
                checked:false,
                image:null
            }
        ]
    },
    {
        name:"地理",
        id:"group-01",
        questions:[
            {
                question:"地中海性気候",
                answer:"Cs",
                checked:false,
                image:null
            }
        ]
    }
]


//======================================================================
//チェック済みカードの管理

let checkedQuestions = [];

function updateCheckedButton(){
    checkedQuestions = currentQuestions.filter(question => question.checked === true)
    if(checkedQuestions.length === 0){
        SelectChecked.style.display = "none";
    }else{
        SelectChecked.style.display = "block";
    }
}

//使用するカードの管理

let currentQuestions = [];

//ボタンの動作を確認する
function checkbutton(){
    if(currentQuestions.length === CardNumber){ //最後の画面(終了画面)
        NextQuestion.disabled = true;
        PrevQuestion.disabled = false;
    }else if(CardNumber === 0){ //最初
        NextQuestion.disabled = false;
        PrevQuestion.disabled = true;
    }else{ //途中
        NextQuestion.disabled = false;
        PrevQuestion.disabled = false;
    }
}

//カードをめくる
function showcard(){
    checkbutton();
    if(CardNumber < currentQuestions.length){
        FinishScreen.style.display="none";
        Card.style.display="block";
        Question.textContent = currentQuestions[CardNumber].question
        Answer.textContent = currentQuestions[CardNumber].answer
        AnswerBox.style.display="none";
        SeeAnswer.textContent="答"

        checkbutton();

        CheckCard.checked = currentQuestions[CardNumber].checked;

        if(currentQuestions[CardNumber].image){
            QuestionImage.src = currentQuestions[CardNumber].image
            QuestionImage.style.display = "block"
            Expansion.style.display = "block"
        }else{
            QuestionImage.removeAttribute("src")
            QuestionImage.style.display = "none"
            Expansion.style.display = "none"
        }

    }else{
        FinishScreen.style.display="block";
        Card.style.display="none";
    }
    
}


//始める
function ankistart (){
    CardNumber = 0;
    
    showcard();
}










//=====================================================================
//画像
//=====================================================================
//NewQuestionImage：HTMLのinput要素そのもの
//NewQuestionImage.files：選択されたファイルの一覧
//NewQuestionImage.files[0]：実際に選択されたファイル
//Reader.result は FileReaderが読み込み終わったファイルの内容を格納する場所

NewQuestionImage.addEventListener("change",()=>{
    const Reader = new FileReader() //これでファイルを読み込むためのオブジェクトを作れる
    Reader.onload = () => {
        NewQuestionImageData = Reader.result

        console.log(NewQuestionImageData)
    }

    Reader.readAsDataURL(NewQuestionImage.files[0])

    console.log(NewQuestionImageData)
})

if(NewQuestionImage.files[0] === undefined){
    NewQuestionImageData = null
    console.log(NewQuestionImageData)
}else{
    const Reader = new FileReader()
    Reader.onload = () => {
        NewQuestionImageData = Reader.result
    }
    Reader.readAsDataURL(NewQuestionImage.files[0])
}

ResetNewQuestionImage.addEventListener("click",()=>{
    NewQuestionImage.value = ""
    NewQuestionImageData = null
})

//=====================================================================
//画像拡大機能
//=====================================================================
const Expansion = document.getElementById("expansion")
const ImageModal = document.getElementById("image-modal")
const ExpandedImage = document.getElementById("expanded-image")

Expansion.addEventListener("click",()=>{
    ImageModal.style.display = "flex"
    ExpandedImage.style.display = "block"
    ExpandedImage.src = QuestionImage.src
})


ExpandedImage.addEventListener("click",()=>{
    ImageModal.style.display = "none"
})
//=====================================================================
//localStrage保存
//=====================================================================
/*const karitext = ["気象","地理","歴史"];
const Jkaritext = JSON.stringify(karitext)
localStorage.setItem("text",Jkaritext)

const JJkaritext = JSON.parse(localStorage.getItem("text"))*/

const SavedGroups = localStorage.getItem("groups")
if(SavedGroups === null){
    groups = []
}else{
    groups = JSON.parse(SavedGroups)
}

function SaveGroups(){
    const Jgroups = JSON.stringify(groups)
    localStorage.setItem("groups",Jgroups)
}

//=====================================================================
//localStrage保存
//=====================================================================

function ResetGroups(){
    groups = [
    {
        name:"気象",
        id:"group-00",
        questions:[
            {
                question:"地表(高度0km)から高度約11kmの層",
                answer:"対流圏",
                checked:false
            },
            {
                question:"オゾン層が存在し、紫外線を吸収する層",
                answer:"成層圏",
                checked:false
            }
        ]
    },
    {
        name:"地理",
        id:"group-01",
        questions:[
            {
                question:"地中海性気候",
                answer:"Cs",
                checked:false
            }
        ]
    }
]
}

if(SavedGroups === null){
    ResetGroups()
    SaveGroups()
}else{
    groups = JSON.parse(SavedGroups)
}

//=====================================================================
//ここからは問題作成
//=====================================================================
function dg (a){
    return document.getElementById(a)
}
const NewQuestion = dg("new-question")
const NewAnswer = dg("new-answer")
const SelectWhereGroup = dg("select--where-group")
const DecisionNewQuestion = dg("decision-new-question")

function updateNewQuestionList(){
    SelectWhereGroup.innerHTML=""
    groups.forEach((group)=>{
        const option = document.createElement("option")
        option.textContent= group.name
        option.value = group.id
        SelectWhereGroup.appendChild(option)
    })
}

function updateDecisionButton(){

    if(NewQuestion.value === "" || NewAnswer.value === ""){
        DecisionNewQuestion.disabled = true
    }else{
        DecisionNewQuestion.disabled = false
    }
}

NewQuestion.addEventListener("input",()=>{
    updateDecisionButton()
})

NewAnswer.addEventListener("input",()=>{
    updateDecisionButton()
})

DecisionNewQuestion.addEventListener("click",()=>{
    if(NewQuestion.value === "" || NewAnswer.value === ""){
        return
    }
    const SelectedGroup = groups.find((group)=>{
    return group.id === SelectWhereGroup.value
    })
    SelectedGroup.questions.push({
    question:NewQuestion.value,
    answer:NewAnswer.value,
    checked:false,
    image:NewQuestionImageData
    })
    NewQuestion.value = ""
    NewAnswer.value = ""
    SaveGroups()
    updateDecisionButton()
    updateCheckedButton();
    updateQuestionList()
    updateChangeQuestionList()
})




//=====================================================================
//ここからは問題編集と削除
//=====================================================================
const SelectChangeQuestonBox =dg("select-change-question-box")
const SelectChangeQuestionButton =dg("select-change-question-button")
const ChangeQuestionScreen =dg("change-question-screen")
const ChangeQuestionBox =dg("change-question-box")
const ChangeAnswerBox =dg("change-answer-box")
const ChangeGroupBox =dg("change-group-box")
const ChangeImageBox =dg("change-image-box")
const KeepChangeGroupButton =dg("keep-change-group-button")
const DestroyQuestionBox =dg("destroy-question-box")
const DestroyQuestionButton =dg("destroy-question-button")

let EditingQuestion

let EditingGroup
let EditingQuestionIndex

function updateChangeQuestionList(){
    SelectChangeQuestonBox.innerHTML= ""
    groups.forEach(group=>{
        group.questions.forEach((question,index)=>{
            const option = document.createElement("option")
            option.textContent= question.question
            option.value = group.id +"|"+index
            SelectChangeQuestonBox.appendChild(option)
        })
    })
}

function updateChangeGroupList(){
    ChangeGroupBox.innerHTML=""
    groups.forEach((group)=>{
        const option = document.createElement("option")
        option.textContent = group.name
        option.value = group.id
        ChangeGroupBox.appendChild(option)
    })
}
function updateQuestionList(){
    DestroyQuestionBox.innerHTML = ""
    groups.forEach((group)=>{
        group.questions.forEach((question,index)=>{
        const option = document.createElement("option")
        option.textContent = question.question
        option.value = group.id + "|" + index
        DestroyQuestionBox.appendChild(option)
        })
    })
}
SelectChangeQuestionButton.addEventListener("click",()=>{
    ChangeQuestionScreen.style.display = "block"
    KeepChangeGroupButton.style.display = "block"
    const SelectedQuestionInfo = SelectChangeQuestonBox.value.split("|")
    const SelectedGroup = groups.find((group)=>{
    return group.id === SelectedQuestionInfo[0]
    })
    const SelectedQuestion = SelectedGroup.questions[SelectedQuestionInfo[1]]
    EditingQuestion = SelectedQuestion
    EditingGroup = SelectedGroup
    EditingQuestionIndex = SelectedQuestionInfo[1]

    //入力欄への反映
    ChangeQuestionBox.value = SelectedQuestion.question
    ChangeAnswerBox.value = SelectedQuestion.answer
    ChangeGroupBox.value = SelectedGroup.id
})
KeepChangeGroupButton.addEventListener("click",()=>{
    EditingQuestion.question = ChangeQuestionBox.value
    EditingQuestion.answer = ChangeAnswerBox.value
    if(EditingGroup.id !== ChangeGroupBox.value){
        EditingGroup.questions.splice(EditingQuestionIndex,1)
        const NewGroup = groups.find(group=>{
            return group.id === ChangeGroupBox.value
        })

        NewGroup.questions.push(EditingQuestion)
    }
    

    if(ChangeImageBox.files[0]){
        const Reader = new FileReader()
        Reader.onload = () => {
            EditingQuestion.image = Reader.result
            SaveGroups()
        alert("変更を保存しました")
        ChangeQuestionScreen.style.display = "none"
        KeepChangeGroupButton.style.display ="none"
        }
    }else{
        SaveGroups()
        alert("変更を保存しました")
        ChangeQuestionScreen.style.display = "none"
        KeepChangeGroupButton.style.display ="none"
    }
    Reader.readAsDataURL(ChangeImageBox.files[0])
})
DestroyQuestionButton.addEventListener("click",()=>{
    if(confirm("本当に削除しますか？")){
    const SelectedQuestionInfo = DestroyQuestionBox.value.split("|")
    const SelectedGroup = groups.find((group)=>{
        return group.id === SelectedQuestionInfo[0]
    })
    SelectedGroup.questions.splice(SelectedQuestionInfo[1], 1)
    SaveGroups()
    updateQuestionList()
    updateChangeQuestionList()
    }
})

//=====================================================================
//ここからはセット新規作成など
//=====================================================================
const NewGroupNameBox = document.getElementById("new-group-name")
const DecisionNewGroupName = document.getElementById("decision-new-group-name")

function updateGroupList(){

    GroupList.innerHTML = ""

    groups.forEach(group=>{
    const NewButton = document.createElement("button");
    NewButton.innerText = group.name
    NewButton.id=group.id;
    GroupList.appendChild(NewButton)

    NewButton.addEventListener("click",()=>{
    currentQuestions = group.questions;
    GroupSelect.style.display = "none";
    AllOrImportantSelect.style.display = "block";
    updateCheckedButton();
    })
    })
}

NewGroupNameBox.addEventListener("input",()=>{
if(NewGroupNameBox.value === ""){
    DecisionNewGroupName.disabled =true
}else{
    DecisionNewGroupName.disabled=false
}
})

DecisionNewGroupName.addEventListener("click",()=>{
    let NewGroupName = NewGroupNameBox.value
    console.log(NewGroupName)
    NewGroupNameBox.value =""
    DecisionNewGroupName.disabled = true
    if(NewGroupName === ""){
        DecisionNewGroupName.disabled = true
        return
    }  
    const NewGroupId = "group-"+String(groups.length).padStart(2,"0")//String(a).padStart(b,"c")は、aの数字をb桁にするために最初にcを入れるってこと。

    groups.push({
        name:NewGroupName,
        id:NewGroupId,
        questions:[]
    })

    SaveGroups()
    updateGroupList();
    updateGroupDestroyList()
    updateNewQuestionList()
    updateDecisionButton()
    updateChangeGroupList()
    updateChangeQuestionList()

})
//=====================================================================
//ここからはセット削除
//=====================================================================
const GroupDestroyList = document.getElementById("group-destroy-list")
const GroupDestroyButton = document.getElementById("group-destroy-button")

function updateGroupDestroyList(){
    GroupDestroyList.innerHTML = ""
    groups.forEach((group)=>{
        const option = document.createElement("option")
        option.textContent= group.name
        option.value = group.id
        GroupDestroyList.appendChild(option)
    })
}

GroupDestroyButton.addEventListener("click",()=>{
    if(confirm("本当に削除しますか？")){
    console.log(GroupDestroyList.value)
    groups = groups.filter((group)=>{
            return group.id !== GroupDestroyList.value
            })
    
    SaveGroups()
    updateGroupList()
    updateGroupDestroyList()
    updateNewQuestionList()
    updateDecisionButton()
    }
})





//=====================================================================
//行動
//=====================================================================

//最初

function SeeFirst(){
    Anki.style.display = "block";
Explain.style.display = "none";
CreateDestroy.style.display = "none";


GroupSelect.style.display = "block";

ChangeQuestionScreen.style.display ="none"
KeepChangeGroupButton.style.display= "none"
FinishScreen.style.display = "none"

updateGroupList();
updateGroupDestroyList()
updateNewQuestionList()
updateDecisionButton()
updateChangeGroupList()
updateChangeQuestionList()
updateQuestionList()
}


SeeFirst()

SelectAll.addEventListener("click",()=>{
    AllOrImportantSelect.style.display = "none";
    ankistart();
})

SelectChecked.addEventListener("click",()=>{
    AllOrImportantSelect.style.display = "none";
    currentQuestions = checkedQuestions;
    ankistart();
})


//カードクリックされた時
PrevQuestion.addEventListener("click",()=>{
    if(CardNumber > 0){
        CardNumber -= 1
        showcard();
    }
});

NextQuestion.addEventListener("click",()=>{
    CardNumber += 1
    
    showcard();    
});

SeeAnswer.addEventListener("click",()=>{
    if(AnswerBox.style.display==="none"){
        AnswerBox.style.display="block";
        Answer.textContent=currentQuestions[CardNumber].answer;
        SeeAnswer.textContent="隠"
    }else{
        AnswerBox.style.display="none";
        Answer.textContent="";
        SeeAnswer.textContent="答"
    }
})

//チェックされた時
CheckCard.addEventListener("change",()=>{
    currentQuestions[CardNumber].checked = CheckCard.checked;

    SaveGroups()
    updateCheckedButton();
})

//メニューのクリックイベント
AnkiButton.addEventListener("click",()=>{
    Anki.style.display = "block";
    Explain.style.display = "none";
    CreateDestroy.style.display = "none";
})

ExplainButton.addEventListener("click",()=>{
    Anki.style.display = "none";
    Explain.style.display = "block";
    CreateDestroy.style.display = "none";
})

CreateDestroyButton.addEventListener("click",()=>{
    Anki.style.display = "none";
    Explain.style.display = "none";
    CreateDestroy.style.display = "block";
})

//最後戻る
const BackHome = dg("back-home")
BackHome.addEventListener("click",()=>{
    SeeFirst()
})