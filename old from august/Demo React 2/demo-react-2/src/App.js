import './App.css';
const axios = require('axios');

function App() {
 


  function getAmountOfDocuments(e) {
    axios.get('http://localhost:8000/amount') 
    .then(x=>console.log(x.data));
  }

  function getPdf(e) {
    var filename = "myPdf.pdf"
    axios.post('http://localhost:8000/pdf', { key: 'value', responseType: 'blob' })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        if (typeof window.navigator.msSaveBlob === 'function') {
          window.navigator.msSaveBlob(
            res.data,
            filename
          );
        } else {
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
        }
      },
        (error) => {
          alert("Something went wrong");
        });
  }

  function getCsv(e) {
    axios.get('http://localhost:8000/csv')
      .then(x => { return x; });
  }

  function getTxt(e) {
    var filename = "testname"
    axios.post('http://localhost:8000/txt', { key: 'value', responseType: 'blob' })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        if (typeof window.navigator.msSaveBlob === 'function') {
          window.navigator.msSaveBlob(
            res.data,
            filename
          );
        } else {
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
        }
      },
        (error) => {
          alert("Something went wrong");
        });
  }

  let documentAmount = 14;
  //get by api all documents
  return (
    <div className="App">
      <div>
        Documents amount: {documentAmount}
      </div>
      <div>
        <input></input>
        <button onClick={getPdf}>GetPdf</button>
        <button onClick={getCsv}>GetExcel</button>
        <button onClick={getTxt}>GetTxt</button>
        <button onClick={getAmountOfDocuments}>GetAmountOfDocuments</button>
      </div>
    </div>
  );
}

export default App;
