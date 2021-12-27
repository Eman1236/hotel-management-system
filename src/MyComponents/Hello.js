

const Hello = (props) => {
    console.log(props.dummy);
    return(
      <div>
        <p>Hello world {props.name}</p>
      </div>
    )
  }

export default Hello;