export class Account {
  constructor(data) {
    this.id = data.id || ''
    this.email = data.email || ''
    this.name = data.name || ''
    this.picture = data.picture || ''
    this.github = data.github || ''
    this.linkedIn = data.linkedIn || ''
    this.resume = data.resume || ''
    this.bio = data.bio || ''
    this.coverImg = data.coverImg || ''
    this.picture = data.picture || '' 
    // TODO add additional properties if needed
  }
}
