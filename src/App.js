import React from "react";
import axios from "axios";
import { Button, Table, Form } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      edit : ""
    };
  }

  componentDidMount() {
    axios.get(`https://newsapi.org/v2/top-headlines?country=id&apiKey=2058d0807b5d4157977655a1a6653a10`).then((res) => {
      console.log(res.data);
      this.setState({ data: res.data.articles });
    });
  }

  addData=()=>{
    axios.get(`https://newsapi.org/v2/top-headlines?country=id&apiKey=2058d0807b5d4157977655a1a6653a10`).then((res) => {
      console.log(res.data);
      const newData = [...this.state.data]
      // newData.push(res.data.articles)

      const newfetchData = [...res.data.articles]
      for(let i=0;i<newfetchData.length; i++){
        newData.push(newfetchData[i])
      }
      this.setState({ data: newData });
    });
  }

  deleteData=(ind)=>{
    console.log(ind)
    const data = this.state.data
    console.log(data[ind])
    data.splice(ind,1)
    console.log(data)
    this.setState({data : data})
  }

  editData=(ind)=>{
    this.setState({edit : ind})

  }


  saveData=(ind)=>{
    let newTitle= this.refs.title.value
    let newAuthor = this.refs.author.value

    const editTitle= [...this.state.data]
    console.log(editTitle)
    // editTitle[ind].
    console.log(newTitle)
    console.log(newAuthor)

  }



  render() {
    // console.log(this.state.data);
    console.log(this.state.edit)
    return (
      <div>
        <h1>CRUD from NewsAPI</h1>
        <Button variant="success" onClick={this.addData}>Add Data</Button>
        

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item, ind) => {
              if(ind ===this.state.edit){
                return(
                  <tr key={ind}>
                  <td>{ind+1}</td>
                  <td><Form.Control type="text"  defaultValue={item.title} ref="title" /></td>
                  <td><Form.Control type="text"  defaultValue={item.author} ref="author" /></td>
                  <td>
                    <Button variant="success" onClick={this.saveData(ind)}>Simpan</Button>
                    <Button variant="danger" onClick={()=>this.state.edit({edit : ""})}>Batal</Button>
                  </td>
                </tr>
                )
              }
              return (
                <tr key={ind}>
                  <td>{ind+1}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>
                    <Button variant="warning" onClick={()=>this.editData(ind)}>Edit</Button>
                    <Button variant="danger" onClick={()=>this.deleteData(ind)}>Hapus</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
