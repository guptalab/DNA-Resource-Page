import {Buffer} from 'buffer'
import {ArticleBuilder} from './articleBuilder'
const Cite = require('citation-js')

export const parseBibFromFileBuffer = async (buffer) => {
    try {
        const dois = parseDOIFromBibBuffer(buffer)
        const result = []
        for(const doi of dois){
            if(!doi) continue
            const data = await fetchBibInfo(doi)
            if(!data) continue
            result.push(serializeBibData(data))
        }
        return result
    } catch (err) {
        throw err
    }
}

const parseDOIFromBibBuffer = (buffer) => {
    try {
        const input = Buffer.from(buffer).toString('utf8').replace(/\\/g, '').replace(/\$/g, '')
        const output = new Cite(input);
        const data = output.get({
            format: 'string',
            type: 'json',
            style: 'csl'
        })
        const jsonData = JSON.parse(data)
        return jsonData.map((item) => item.DOI)
    } catch (error) {
        throw error
    }
}

const fetchBibInfo = async (doi) => {
    try {
        const pattern = /^(http[s]?:\/\/(.+\.)?)?doi\.org\/.*$/
        let url = doi
        if(!pattern.test(doi)){
            url = `https://doi.org/${doi}`
        }
        const citation = await Cite.async(doi);
        const citationData = citation.get({
            format: 'string',
            type: 'json',
            style: 'bibtex'
        })
        const data = JSON.parse(citationData)
        data[0].properties.url = url
        return data[0]
    } catch (error) {
        if(error.message === "No parser found for @else/url"){
            return null
        }
        throw error
    }
}

const serializeBibData = (data) => {
    try {
        const {title, author, year, month, publisher, organization, url} = data.properties
        return new ArticleBuilder()
            .addTitle(title)
            .addAuthors(author)
            .addPublishedDate(month, year)
            .addSource(publisher, organization)
            .addLink(url)
            .build()
    } catch (error) {
        throw error
    }
}