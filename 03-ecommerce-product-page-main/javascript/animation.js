const tl = gsap.timeline();

tl.from(
	".nav__logo, .nav, .header__right-img, .header__right-profile-icon, .badge--primary",
	{
		y: -600,
		duration: 1,
		stagger: 0.5,
		yoyo: true,
        opacity: 0, 
	}
);

tl.from(".main__left", {
	x: -780,
});

tl.from(".main__right", {
	x: 780,
});

tl.from(".main__left, .main__right", {
	duration: 1,
	stagger: 0.5,
	yoyo: true,
    opacity: 0,
});
