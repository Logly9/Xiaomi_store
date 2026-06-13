document.addEventListener('DOMContentLoaded',function(){
	const menuItems = document.querySelectorAll('white-header .middle-nav > li');

	menuItems.forEach(function (li){
		li.addEventListener('click' ,function(e){
			const link = this.querySelector(':scope > a');
			if(!e.target.closest('.nav-list')){
				e.preventDefault();

				const isActive = this.classList.contains('active');

				menuItems.forEach(item => item.classList.remove('active'));

				if(!isActive){
					this.classList.add('active');
				}
			}
		});
	});
})