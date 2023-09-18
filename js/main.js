let $dayInput
let $monthInput
let $yearInput
let $dayResult
let $monthResult
let $yearResult
let $countBtn
let $dayErrorText
let $monthErrorText
let $yearErrorText
let $inputsSection
let $date
let $currentYear
let $currentMonth
let $currentDay

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	$dayInput = document.querySelector('.app-body__inputs__box--input-day')
	$monthInput = document.querySelector('.app-body__inputs__box--input-month')
	$yearInput = document.querySelector('.app-body__inputs__box--input-year')
	$yearResult = document.querySelector('.app-body__results__box--result-years')
	$monthResult = document.querySelector('.app-body__results__box--result-months')
	$dayResult = document.querySelector('.app-body__results__box--result-days')
	$countBtn = document.querySelector('.app-body__button--button')
	$dayErrorText = document.querySelector('.app-body__inputs__box--error-day')
	$monthErrorText = document.querySelector('.app-body__inputs__box--error-month')
	$yearErrorText = document.querySelector('.app-body__inputs__box--error-year')
	$inputsSection = document.querySelector('.app-body__inputs')
	$date = new Date()
	$currentYear = $date.getFullYear()
	$currentMonth = $date.getMonth()
	$currentDay = $date.getDate()
}

const prepareDOMEvents = () => {
	$countBtn.addEventListener('click', checkInputs)
}

const daysInMonth = (month, year) => {
	return new Date(year, month, 0).getDate();
}

const checkInputs = () => {

	if ($dayInput.value > daysInMonth($monthInput.value, $yearInput.value)) {
		$inputsSection.classList.add('error');
		$dayErrorText.textContent = 'Must be a valid day'
		$monthErrorText.textContent = ''
		$yearErrorText.textContent = ''
	} else if ($monthInput.value > 12) {
		$inputsSection.classList.add('error');
		$monthErrorText.textContent = 'Must be a valid month'
		$dayErrorText.textContent = ''
		$yearErrorText.textContent = ''
	} else if ($yearInput.value > $currentYear || $yearInput.value === $currentYear) {
		$inputsSection.classList.add('error');
		$yearErrorText.textContent = 'Must be in the past'
		$dayErrorText.textContent = ''
		$monthErrorText.textContent = ''
	} else if ($dayInput.value === '' || $monthInput.value === '' || $yearInput.value === '') {
		$inputsSection.classList.add('error'); 
	} else {
		$inputsSection.classList.remove('error');
		$inputsSection.firstElementChild.nextElementSibling.classList.remove('error')
		countAge()
	}
}

const countAge = () => {
	const countedYear = $currentYear - $yearInput.value
	const countedMonth = $currentMonth + 1 - $monthInput.value
	const countedDays = $currentDay - $dayInput.value

	if (countedMonth < 0 && countedDays < 0) {
		$yearResult.textContent = `${countedYear - 1}`
		$monthResult.textContent = `${12 - -countedMonth}`
		$dayResult.textContent = `${daysInMonth($monthInput.value, $yearInput.value) - -countedDays}`
	} else if (countedMonth < 0) {
		$yearResult.textContent = `${countedYear - 1}`
		$monthResult.textContent = `${12 - -countedMonth}`
		$dayResult.textContent = `${countedDays}`
	} else if (countedDays < 0) {
		$yearResult.textContent = `${countedYear}`
		$monthResult.textContent = `${countedMonth - 1}`
		$dayResult.textContent = `${daysInMonth($monthInput.value, $yearInput.value) - -countedDays}` 
	} 

	console.log($currentMonth);
}

window.addEventListener('DOMContentLoaded', main)
