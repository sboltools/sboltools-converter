import React, {Component, Fragment} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'


interface Props {
  onDrop:(files:File[])=>void
}

interface State {
}


class SBOLDropzone extends Component<Props, State> {
  constructor(props){
    super(props);
  }
  handleChange(files:File[]){
    if(files.length > 0) {
      this.props.onDrop(files)
    }
  }
  render(){
    return (
      <DropzoneArea
        onChange={this.handleChange.bind(this)}
        dropzoneText="2. Drop files or click to browse"
        />
    )
  }
}
 
export default SBOLDropzone
