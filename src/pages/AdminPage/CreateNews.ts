import moment from 'moment'
import { action, computed, makeObservable, observable } from 'mobx'
import { ILink, INews } from '../../services/APIService'

// Hardcode city IDs for now
export const cityIDMapping: {[key: string]: number} = {
  'BC (province)': 5,
  Vancouver: 1,
  Richmond: 2,
  Burnaby: 3,
  Coquitlam: 4
}

export class CreateLink {

  @observable title: string | null = null
  @observable summary: string | null = null
  @observable url: string | null = null

  constructor() {
    makeObservable(this)
  }

  @action
  populateUpdateObject(link: ILink) {
    // Don't need ID field for links, they're deleted/recreated server-side
    this.title = link.title
    this.summary = link.summary
    this.url = link.url
  }

  @action
  setTitle(title: string | null) {
    this.title = title || null
  }

  @action
  setSummary(summary: string | null) {
    this.summary = summary || null
  }

  @action
  setURL(url: string | null) {
    this.url = url || null
  }

}

export class CreateNews {

  @observable id: number | null = null
  @observable title: string | null = null
  @observable summary: string | null = null
  @observable meetingType: string | null = null
  @observable cityId: number | null = null
  @observable date: string | null = null
  @observable sentiment: string | null = null
  @observable links: CreateLink[] = [new CreateLink()]

  constructor() {
    makeObservable(this)
  }

  @action
  populateUpdateObject(news: INews) {
    this.id = news.id
    this.title = news.title
    this.summary = news.summary
    this.meetingType = news.meetingType
    this.cityId = news.cityId
    this.date = news.date
    this.sentiment = news.sentiment
    this.links = news.links.map((link) => {
      const createLink = new CreateLink()
      createLink.populateUpdateObject(link)
      return createLink
    })
  }

  @computed get cityName() {
    if (!this.cityId) {
      return null
    }
    for (const [cityName, id] of Object.entries(cityIDMapping)) {
      if (id === this.cityId) {
        return cityName
      }
    }
    return null
  }

  @action
  setTitle(title: string | null) {
    this.title = title || null
  }

  @action
  setSummary(summary: string | null) {
    this.summary = summary || null
  }

  @action
  setMeetingType(meetingType: string | null) {
    this.meetingType = meetingType || null
  }

  @action
  setCityId(cityId: number | null) {
    this.cityId = cityId || null
  }

  @action
  setDate(date: string | null) {
    this.date = date || null
  }

  @action
  setSentiment(sentiment: string) {
    this.sentiment = sentiment || null
  }

  @action
  addLink() {
    this.links.push(new CreateLink())
  }

  @action
  removeLink(index: number) {
    this.links.splice(index, 1)
  }

  getCreateNetworkObject() {
    return {
      title: this.title,
      summary: this.summary,
      meetingType: this.meetingType,
      cityId: this.cityId,
      date: this.date ? moment(this.date).format('YYYY-MM-DD') : null,
      sentiment: this.sentiment,
      links: this.links
    }
  }

  getUpdateNetworkObject() {
    const createObject = this.getCreateNetworkObject()
    return {id: this.id, ...createObject}
  }

  @action
  clearForm() {
    // Keep the city, date, and meeting type the same for easy data entry
    this.id = null
    this.title = null
    this.summary = null
    this.sentiment = null
    this.links = [new CreateLink()]
  }

}
