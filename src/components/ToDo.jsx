import React , {useState , useEffect} from 'react'
import Tasks from "./Tasks.jsx";
import '../App.css'

export default function ToDo() {
  const getDataFromLS = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };
  
  const [inpVal, setInpVal] = useState("");
  const [valInArr, setValInArr] = useState(getDataFromLS("appTasks") || []);
  const [idOfBtn, setIdOfBtn] = useState("add-btn-1");
  const [spanTagT, setSpanTagT] = useState("");
  const [btnDisplay, setBtnDisplay] = useState('none');

  const stylingOfBtn = {
    display: btnDisplay,
  };

  const handleOnChange = (e) => {
    setInpVal(e.target.value);
  };

  const addTasks = () => {
    if (!valInArr.includes(inpVal) && inpVal !== "") {
      setValInArr((prevVal) => {
        return [...prevVal, inpVal];
      });
    }
  };

  const remClass = (targElem, targClass , newClass) => {
    if (targElem.classList.contains(targClass)) {
      targElem.classList.remove(newClass);
    }
  };

  const addClass = (targElem, targClass , newClass) => {
    if (targElem.classList.contains(targClass)) {
      targElem.classList.add(newClass);
    }
  };

  const deleteTasks = (targElem) => {
    if (targElem.id === "del-btn") {
      let spanTag = targElem.parentElement.parentElement.previousElementSibling;
      let dataOfLS = getDataFromLS("appTasks");
      let filteredData = dataOfLS.filter(
        (curElem) => curElem !== spanTag.innerText
      );

      setValInArr(filteredData);
      localStorage.setItem("appTasks", JSON.stringify(filteredData));
      targElem.closest(".task-ctnr").style.display = "none";
    }
  };

  const editTasks = (targElem) => {
    if (targElem.id === "edit-btn") {
      let spanTag = targElem.parentElement.parentElement.previousElementSibling;
      setIdOfBtn("edit-add-btn");
      setSpanTagT(spanTag.innerText);
      setInpVal(spanTag.innerText);
    }
  };

  const addEditedTasks = () => {
    let dataOfLS = valInArr;
    let idxOfEditAbleData = dataOfLS.findIndex(
      (curElem) => curElem === spanTagT
    );
    dataOfLS.splice(idxOfEditAbleData, 1, inpVal);
    localStorage.setItem("appTasks" , JSON.stringify(dataOfLS));
    setInpVal('')
    setIdOfBtn('add-btn-1')
  };

  const remtasks = () => {
    setValInArr('')
    localStorage.setItem("appTasks" , JSON.stringify(valInArr));
    setBtnDisplay("none");
  };

  useEffect(() => {
    setInpVal("");
    localStorage.setItem("appTasks", JSON.stringify(valInArr));
    if (valInArr.length > 0) {
      setBtnDisplay('block');
    }
    else{
      setBtnDisplay('none')
    }
  }, [valInArr]);

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-light main-head">add your list here ✌️</h1>
        <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-10 d-flex justify-content-center align-items-center flex-column main-div p-5">
          <div className="col-12 search-bar mb-5">
            <div className="row">
              <div className="col-11">
                <input
                  type="text"
                  onChange={handleOnChange}
                  className="w-100"
                  placeholder="✍️ add your task"
                  value={inpVal}
                />
              </div>

              <div className="col-1 d-flex justify-content-center align-items-center">
                <button
                  className="add-btn"
                  onClick={(e) => {
                    if (e.target.id === "add-btn-1") {
                      addTasks();
                    } else {
                      addEditedTasks();
                    }
                  }}
                >
                  <i className="fa-solid fa-plus" id={idOfBtn}></i>
                </button>
              </div>
            </div>
          </div>

          {valInArr
            ? valInArr.map((curElem, i) => {
                return (
                  <Tasks
                    task={curElem}
                    key={i}
                    remAniFunc={remClass}
                    addAniFunc={addClass}
                    delTasksFunc={deleteTasks}
                    editTasksFunc={editTasks}
                  />
                );
              })
            : ""}

            <button style={stylingOfBtn} onClick={remtasks} className="mt-5 rem-tasks-btn hvr-wobble-to-bottom-right">remove all</button>
        </div>
      </div>
    </>
  )
}