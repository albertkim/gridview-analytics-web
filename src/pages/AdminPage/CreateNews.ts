import moment from 'moment'
import { action, computed, makeObservable, observable } from "mobx"

// Hardcode city IDs for now
const cityIDMapping: {[key: string]: number} = {
  Vancouver: 1,
  Richmond: 2,
  Burnaby: 3,
  Coquitlam: 4
}

class CreateLink {

  @observable title: string | null = null
  @observable summary: string | null = null
  @observable url: string | null = null

  constructor() {
    makeObservable(this)
  }

  @action
  setTitle(title: string) {
    this.title = title || null
  }

  @action
  setSummary(summary: string) {
    this.summary = summary || null
  }

  @action
  setURL(url: string) {
    this.url = url || null
  }

}

export class CreateNews {

  @observable title: string | null = null
  @observable summary: string | null = null
  @observable meetingType: string | null = null
  @observable cityName: string | null = null
  @observable date: Date | null = null
  @observable sentiment: string | null = null
  @observable links: CreateLink[] = [new CreateLink()]

  constructor() {
    makeObservable(this)
  }

  @computed get cityId() {
    if (this.cityName) {
      return cityIDMapping[this.cityName] || null
    } else {
      return null
    }
  }

  @action
  setTitle(title: string) {
    this.title = title || null
  }

  @action
  setSummary(summary: string) {
    this.summary = summary || null
  }

  @action
  setMeetingType(meetingType: string) {
    this.meetingType = meetingType || null
  }

  @action
  setCityName(cityName: string) {
    this.cityName = cityName || null
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

  getNetworkObject() {
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

}
