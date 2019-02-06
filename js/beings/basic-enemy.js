class BasicEnemy {
  constructor(x = 200, y = 200) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;
    this.color = 'red';
  }

  track(entity) {
    if (entity.y < this.y) {
      this.y -= 1;
    } else if (entity.x > this.x) {
      this.x += 1;
    } else if (entity.y > this.y) {
      this.y += 1;
    } else if (entity.x < this.x) {
      this.x -= 1;
    }
  }
}

export default BasicEnemy;
