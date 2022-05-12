interface Car {
  name: string;
  plate: string;
  entry: Date;
}

class Parking {
  public cars: Car[];
  constructor() {
    this.cars = [];
  }

  enter(car: Car) {
    this.cars.push(car);
    const row = document.createElement("tr");
    const name = document.createElement("td");
    const plate = document.createElement("td");
    const entry = document.createElement("td");
    const actions = document.createElement("td");
    name.innerHTML = car.name;
    plate.innerHTML = car.plate;
    entry.innerHTML = car.entry.toLocaleString("pt-BR", { hour: "numeric", minute: "numeric" });
    actions.innerHTML = "<button class=\"delete\">x</button>";
    row.appendChild(name);
    row.appendChild(plate);
    row.appendChild(entry);
    row.appendChild(actions);
    document.getElementById("garage").appendChild(row);
  }

  leave(plate: string) {
    const leaveTime = new Date();
    const car = cars.find(c => c.plate === plate);
    const parkedTime = this.timeCalc(car.entry.getTime(), leaveTime.getTime());

    alert(`O veículo ${car.name} de placa ${car.plate} permaneceu ${parkedTime} estacionado`);

    this.cars.remove(car);
    render();
  }

  private timeCalc(entryTime: number, leaveTime: number) {
    const time = leaveTime - entryTime;
    const min = Math.floor(time / 60000);
    const sec = Math.floor((time % 60000) / 1000);
    return `${min}m e ${sec}s`;
  }

  render() {
    document.getElementById("garage").innerHTML = "";
    this.cars.forEach((c) => this.enter(c));
  }
}

(function () {
  const parking = new Parking();

  document.getElementById("send").addEventListener("click", () => {
    const nameElement = document.getElementById("name");
    const plateElement = document.getElementById("plate");
    const entryElement = new Date();

    const car: Car = { nameElement.value, plateElement.value, entryElement.value };

    parking.entry(car);
    parking.render();

    nameElement.value = "";
    plateElement.value = "";
  });

  document.getElementById("garage").addEventListener("click", ({ target }: MouseEvent | any) => {
    if (target.className === "delete") {
      parking.leave(target.parentElement.parentElement.cells[1].textContent);
    }
  });
})();
