import { Box, Button, ButtonGroup, Container, Grid } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import Head from 'next/head'


import React, {useMemo} from 'react';
import { sbol1, SBOL1GraphView, SBOL2GraphView, SBOL3GraphView } from 'sbolgraph';
import SBOLDropzone from '../components/SBOLDropzone';

import FileSaver from 'file-saver'
import SBOLImporter from '../src/SBOLImporter';


interface Props {
}

interface State {
  target:string
  loading:boolean
}

export default class Home extends React.Component<Props, State> {

  constructor(props) {
    super(props)

    this.state = {
      target: 'sbol3',
      loading: false
    }

  }

  render() {
    return (
      <div className="container">
        <Head>
          <title>sboltools converter</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="style.css"/>
        </Head>

        <main>
          <Container maxWidth="sm">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container alignItems="center" justify="center">
                  <h1 className="title">
                    sboltools converter
                  </h1>
                </Grid>
                  <p>
                    This Web-based tool can convert from FASTA, GenBank, and SBOL 1/2/3 to SBOL 1/2/3.
                  </p>
                  <p>
                    It uses the <a href="https://github.com/udp/sbolgraph">sbolgraph</a> library and runs entirely within your browser.
                  </p>
              </Grid>
              <Grid item xs={12} className="stage">
                <span className="stageTitle">1. Choose a target format</span>
                <Grid container alignItems="center" justify="center">
                  <Box paddingY={2}>
                    <ButtonGroup variant="contained">
                      <Button {... (this.state.target === 'sbol1' ? {color: 'primary'} : {})} onClick={this.onClickSBOL1} className="outlined">SBOL1</Button>
                      <Button {... (this.state.target === 'sbol2' ? {color: 'primary'} : {})} onClick={this.onClickSBOL2} className="outlined">SBOL2</Button>
                      <Button {... (this.state.target === 'sbol3' ? {color: 'primary'} : {})} onClick={this.onClickSBOL3} className="outlined">SBOL3</Button>
                    </ButtonGroup>
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12} className='stage-separator'>
                <Grid container alignItems="center" justify="center">
                  <ArrowDropDown/>
                </Grid>
              </Grid>
              <Grid item xs={12} className={`stage ${this.state.target === null ? 'stage-disabled': ''}`}>
                {
                  this.state.loading ? 
                    <span>Loading...</span>
                    :
                  <SBOLDropzone onDrop={this.onDrop} />
                }
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    )
  }

  onClickSBOL1 = () => {
    this.setState(prevState => ({ ...prevState, target: 'sbol1' }))
  }
  onClickSBOL2 = () => {
    this.setState(prevState => ({ ...prevState, target: 'sbol2' }))
  }
  onClickSBOL3 = () => {
    this.setState(prevState => ({ ...prevState, target: 'sbol3' }))
  }

  onDrop = async (files:File[]) => {

    this.setState(prevState => ({ ...prevState, loading: true }))

    for(let f of files) {

      let src = await (f as any).text()

      switch(this.state.target) {
        case 'sbol1':
            var g = await SBOLImporter.sbol1GraphFromString(src)
            var out = new SBOL1GraphView(g).serializeXML()
            download(out, f.name)
            break

        case 'sbol2':
            var g = await SBOLImporter.sbol2GraphFromString(src)
            var out = new SBOL2GraphView(g).serializeXML()
            download(out, f.name)
            break

        case 'sbol3':
            var g = await SBOLImporter.sbol3GraphFromString(src)
            var out = new SBOL3GraphView(g).serializeXML()
            download(out, f.name)
            break

      }



    }

    this.setState(prevState => ({ ...prevState, loading: false }))

  }
}

function download(str, filename) {
  var blob = new Blob([str], { type: 'application/rdf+xml' })
  FileSaver.saveAs(blob, filename.replace(/\./, '_sbol3.'))
}

