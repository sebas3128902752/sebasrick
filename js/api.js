fetch('https://rickandmortyapi.com/api/character')
	.then(response => response.json())
	.then(data => {
		const characters = data.results
		const container = document.querySelector('main')
		const searchInput = document.getElementById('search')

		let debounceTimeout

		searchInput.addEventListener("input", () => {
			clearTimeout(debounceTimeout) 
			debounceTimeout = setTimeout(search, 500)
		}) 

		async function search() {
			const main = document.querySelector("main")
			main.innerHTML = ""
			const urlName = `https://rickandmortyapi.com/api/character/?name=${searchInput.value}`
			const urlSpecies = `https://rickandmortyapi.com/api/character/?species=${searchInput.value}`
			const urlStatus = `https://rickandmortyapi.com/api/character/?status=${searchInput.value}`
			const urlGender = `https://rickandmortyapi.com/api/character/?gender=${searchInput.value}`
			await searchCharacter(urlName)
			await searchCharacter(urlSpecies)
			await searchCharacter(urlStatus)
			await searchCharacter(urlGender)
		}
		async function createCard(character) {

			const cards = document.createElement('div')
			cards.id = 'container'
			cards.classList.add('card')

			const imgCard = document.createElement('img')
			imgCard.classList.add('imgCard')
			imgCard.id = 'imgCard'
			imgCard.src = character.image
			imgCard.alt = character.name

			const txt_container = document.createElement('div')
			txt_container.id = 'txt_container'
			txt_container.classList.add('txt')

			const name_container = document.createElement('h2')
			name_container.id = 'name_container'
			name_container.classList.add('name')
			name_container.textContent = character.name

			const status_container = document.createElement('h3')
			status_container.id = 'status_container'
			status_container.classList.add('status')

			const specie_container = document.createElement('h4')
			specie_container.id = 'specie_container'
			specie_container.classList.add('specie')
			specie_container.textContent = `Specie: ${character.species}`

			const specie_gender = document.createElement('h4')
			specie_gender.id = 'specie_gender'
			specie_gender.classList.add('gender')
			specie_gender.textContent = `Gender: ${character.gender}`

			cards.appendChild(imgCard)
			cards.appendChild(txt_container)

			txt_container.appendChild(name_container)
			txt_container.appendChild(status_container)
			txt_container.appendChild(specie_container)
			txt_container.appendChild(specie_gender)

			container.appendChild(cards)

			switch (character.status) {
				case 'Alive':
					status_container.textContent = `🟢Status: ${character.status}`
					cards.addEventListener('mouseenter', () => {
						status_container.style.color = '#00ff2a'
						cards.style.boxShadow = '0px 0px 15px 0px #00ff2a'

					})

					cards.addEventListener('mouseleave', () => {
						status_container.style.color = ''
						cards.style.boxShadow = ''

					})

					status_container.addEventListener('click', () => searchCharacterAlive())

					function searchCharacterAlive() {
						const main = document.querySelector("main")
						main.innerHTML = ""
						const url = 'https://rickandmortyapi.com/api/character/?status=Alive'
						searchCharacter(url)

					}

					break

				case 'Dead':
					status_container.textContent = `🔴Status: ${character.status}`

					cards.addEventListener('mouseenter', () => {
						status_container.style.color = 'red'
						cards.style.boxShadow = '0px 0px 15px 0px crimson'

					})

					cards.addEventListener('mouseleave', () => {
						status_container.style.color = ''
						cards.style.boxShadow = ''

					})

					status_container.addEventListener('click', () => searchCharacterDead())

					function searchCharacterDead() {
						const main = document.querySelector("main")
						main.innerHTML = ""
						const url = 'https://rickandmortyapi.com/api/character/?status=Dead'
						searchCharacter(url)

					}

					break
				default:
					status_container.textContent = `🟡Status: ${character.status}`

					cards.addEventListener('mouseenter', () => {
						status_container.style.color = 'yellow'
						cards.style.boxShadow = '0px 0px 15px 0px yellow'

					})

					cards.addEventListener('mouseleave', () => {
						status_container.style.color = ''
						cards.style.boxShadow = ''

					})
					status_container.addEventListener('click', () => searchCharacterUnknown())
					function searchCharacterUnknown() {
						const main = document.querySelector("main")
						main.innerHTML = ""
						const url = 'https://rickandmortyapi.com/api/character/?status=Unknown'
						searchCharacter(url)

					}
					
					break
			}
			switch (character.species) {
				case 'Human':
					specie_container.textContent = `👤Specie: ${character.species}`
					cards.addEventListener('mouseenter', () => {
						specie_container.style.color = 'blue'
						
					})
					cards.addEventListener('mouseleave', () => {
						
						specie_container.style.color = ''
						
					})

					specie_container.addEventListener('click', () => searchCharacterHuman())
					function searchCharacterHuman() {
						const main = document.querySelector("main")
						main.innerHTML = ""
						const url = 'https://rickandmortyapi.com/api/character/?species=Human'
						searchCharacter(url)
					}
					break
				case 'Alien':
					specie_container.textContent = `👽Specie: ${character.species}`
					cards.addEventListener('mouseenter', () => {
						specie_container.style.color = 'green'

					})

					cards.addEventListener('mouseleave', () => {
						specie_container.style.color = ''
					})
					specie_container.addEventListener('click', () => searchCharacterAlien())
					function searchCharacterAlien() {
						const main = document.querySelector("main")
						main.innerHTML = ""
						const url = 'https://rickandmortyapi.com/api/character/?species=Alien'
						searchCharacter(url)
					}
					break

				default:
					specie_container.textContent = `👾Specie: ${character.species}`

					cards.addEventListener('mouseenter', () => {
						specie_container.style.color = 'purple'
					})
					cards.addEventListener('mouseleave', () => {
						specie_container.style.color = ''
					})
					specie_container.addEventListener('click', () => searchCharacterUnknown())
					function searchCharacterUnknown() {
						const main = document.querySelector("main")
						main.innerHTML = ""
						searchInput.value = "Unknown"
						const url = 'https://rickandmortyapi.com/api/character/?species=unknown'
						searchCharacter(url)
					}
					break
			}
		}
		function makeCards() {
			characters.forEach(character => {
				createCard(character)
			})

		}
		makeCards()

		const searchCharacter = async (URL) => {
			const response = await fetch(URL)
			const data = await response.json()
			
			try {
				printCharacters(data.results)
			
			} catch (error) {
				console.log("character not found")
				
			}
		}
		
		try {
			searchCharacter(url)
		
		} catch (error) {
			console.log("Function searchCharacter is not defined")
		
		}
		function printCharacters(characters) {
			characters.forEach(character => createCard(character))
		
		}

		const btnReset = document.getElementById('btnReset')

		btnReset.addEventListener('click', () => {
			const main = document.querySelector("main")
			main.innerHTML = ""
			searchInput.value = ""
			searchCharacter('https://rickandmortyapi.com/api/character')
			localStorage.clear()
			sessionStorage.clear()
		
		})


	})
	.catch(err => console.error(err))