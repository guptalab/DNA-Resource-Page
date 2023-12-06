export class ArticleBuilder{
    #title = "";
    #authors = [];
    #type = "Articles And Papers";
    #topics = ["DNA"];
    #publishedDate = "";
    #source = "";
    #link = "";
    #cleanString(str){
        return str.replace(/{|}/g, '').trim()
    }
    addTitle(title){
        this.#title = title ? this.#cleanString(title) : this.#title;
        return this;
    }
    addAuthors(author){
        this.#authors = author ? author.trim().split(', ') : this.#authors;
        return this;
    }
    addType(type){
        this.#type = type ? type : this.#type;
        return this;
    }
    addTopics(topic){
        this.#topics = topic ? topic.trim().split(', ') : this.#topics;
        return this;
    }
    addPublishedDate(month, year){
        this.#publishedDate = `${month ? month + "-" : ""}${year || ""}`;
        return this;
    }
    addSource(publisher, organization){
        this.#source = publisher ? this.#cleanString(publisher) : (organization ? this.#cleanString(organization) : "");
        return this;
    }
    addLink(url){
        this.#link = url ? url : this.#link;
        return this;
    }
    build(){
        return {
            title: this.#title,
            authors: this.#authors,
            type: this.#type,
            topics: this.#topics,
            publishedDate: this.#publishedDate,
            source: this.#source,
            link: this.#link,
        }
    }

}