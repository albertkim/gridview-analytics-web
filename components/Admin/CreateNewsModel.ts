import moment from 'moment'
import { action, computed, makeObservable, observable } from 'mobx'
import { ILink, INews } from '@/services/Models'

// Hardcode city IDs for now
export const cityIDMapping: {[key: string]: number} = {
  'BC (province)': 5,
  Vancouver: 1,
  Richmond: 2,
  Burnaby: 3,
  Coquitlam: 4,
  Surrey: 6
}

export class CreateLinkModel {

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

export class CreateNewsModel {

  @observable id: number | null = null
  @observable title: string | null = null
  @observable summary: string | null = null
  @observable meetingType: string | null = null
  @observable cityId: number | null = null
  @observable date: string | null = null
  @observable important: number | null = 0
  @observable tags: string[] = []
  @observable links: CreateLinkModel[] = [new CreateLinkModel()]

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
    this.important = news.important || 0
    this.tags = news.tags
    this.links = news.links.map((link) => {
      const createLink = new CreateLinkModel()
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
  setImportant(important: number | null) {
    this.important = important || 0
  }

  @action
  setTags(tags: string[]) {
    this.tags = tags
  }

  @action
  addLink() {
    this.links.push(new CreateLinkModel())
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
      important: this.important,
      tags: this.tags,
      links: this.links
    }
  }

  getUpdateNetworkObject() {
    const createObject = this.getCreateNetworkObject()
    return {id: this.id, ...createObject}
  }

  @action
  clearForm() {
    this.id = null
    this.cityId = null
    this.date = null
    this.meetingType = null
    this.title = null
    this.summary = null
    this.important = null
    this.tags = []
    this.links = [new CreateLinkModel()]
  }

}
