const Polygon = class 	{
	constructor(height, width) {
		this.height = height;
		this.width = width;
	}

	area() {
		return this.height * this.width;
	}
}

console.log(new Polygon(3, 4).area())