import moment from 'moment'
import { action, computed, makeObservable, observable } from "mobx"

// Hardcode city IDs for now
export const cityIDMapping: {[key: string]: number} = {
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

  @observable title: string | null = null
  @observable summary: string | null = null
  @observable meetingType: string | null = null
  @observable cityId: number | null = null
  @observable date: Date | null = null
  @observable sentiment: string | null = null
  @observable links: CreateLink[] = [new CreateLink()]

  constructor() {
    makeObservable(this)
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
  setDate(date: Date | null) {
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
