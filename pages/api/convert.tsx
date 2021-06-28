import { SBOL1GraphView, SBOL2GraphView, SBOL3GraphView } from "sbolgraph"
import SBOLImporter from "../../src/SBOLImporter"

export default async function convert(req, res) {

    let src = req.body

    let target = req.query.target

    switch(target) {
        case 'sbol1':
            var g = await SBOLImporter.sbol1GraphFromString(src)
            res.send(new SBOL1GraphView(g).serializeXML())
        case 'sbol2':
            var g = await SBOLImporter.sbol2GraphFromString(src)
            res.send(new SBOL2GraphView(g).serializeXML())
        case 'sbol3':
            var g = await SBOLImporter.sbol3GraphFromString(src)
            res.send(new SBOL3GraphView(g).serializeXML())
        default:
            res.status(500).send('no target')
    }


}