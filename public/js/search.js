var searchFilter = () => {
            let selectedCategory = document.getElementById("filterByColor").value;
            const input = document.querySelector(".form-control");
            let textBox= input.value;
            const cards = document.getElementsByClassName("col");
            for (let i = 0; i < cards.length; i++) {
                let title = cards[i].querySelector(".card-body");
                if ((cards[i].classList.contains(selectedColor) || selectedColor=="") && title.innerText.toLowerCase().indexOf(textBox.toLowerCase()) > -1) {
                    cards[i].classList.remove("d-none");
                } else {
                    cards[i].classList.add("d-none");
                }
            }
        }