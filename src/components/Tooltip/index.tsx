import {
	type JSX,
	Show,
	createSignal,
	onCleanup,
	createEffect,
} from "solid-js";

type Props = {
	children: JSX.Element;
};

function Tooltip(props: Props) {
	const [isVisible, setIsVisible] = createSignal(false);
	const [shouldRender, setShouldRender] = createSignal(false);
	const [clickCount, setClickCount] = createSignal(0);
	const [animateText, setAnimateText] = createSignal(false);
	let timeoutId: number;

	const messages = [
		"Hi there!",
		"Clicked again?",
		"Still here?",
		"Persistent, aren't you?",
		"What's up?",
		"Again? Really?",
		"You're curious!",
		"Not cool!",
		"Give it a break!",
		"That's annoying!",
		"Hands off!",
		"No more clicks!",
		"Seriously?!",
		"Ouch! That hurts!",
		"You're persistent!",
		"Why the curiosity?",
		"I'm getting tired!",
		"I'm bored!",
		"Enough's enough!",
		"Find another hobby!",
		"Stop, please!",
		"Okay, last one!",
		"That's it, I'm done!",
	];

	const currentMessage = () => {
		const count = clickCount();
		return count >= messages.length
			? messages[messages.length - 1]
			: messages[count];
	};

	const showTooltip = () => {
		setClickCount((c) => c + 1);
		setShouldRender(true);
		setTimeout(() => setIsVisible(true), 10); // allow transition

		// trigger text animation
		setAnimateText(false);
		setTimeout(() => setAnimateText(true), 50);

		clearTimeout(timeoutId);
		timeoutId = window.setTimeout(() => {
			setIsVisible(false);
			setTimeout(() => setShouldRender(false), 300); // wait for fade-out
		}, 2000);
	};

	onCleanup(() => clearTimeout(timeoutId));

	createEffect(() => {
		if (!isVisible()) {
			clearTimeout(timeoutId);
		}
	});

	return (
		<div class="relative inline-block">
			<div onMouseDown={showTooltip} onTouchStart={showTooltip}>
				{props.children}
			</div>

			<Show when={shouldRender()}>
				<div
					class={`absolute left-1/2 -translate-x-1/2 -translate-y-24 mt-1 w-auto max-h-[70px] p-2 bg-black text-white text-center rounded-lg z-10 border border-primary-500 whitespace-normal
						shadow-(--box-shadow-custom) after:shadow-(--box-shadow-custom)
						after:content-[''] after:block after:rotate-45 after:w-4 after:h-4
						after:shadow-primary-500 after:absolute after:-bottom-2 after:-translate-x-1/2
						after:left-1/2 after:bg-black after:z-20
						transition-all duration-300 ease-in-out
						backdrop-blur-sm
						${isVisible() ? "opacity-100 blur-0" : "opacity-0 blur-sm"}
					`}
				>
					<p
						class={`w-max transition-all duration-300 ease-in-out
							${animateText() ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}
						`}
					>
						{currentMessage()}
					</p>
				</div>
			</Show>
		</div>
	);
}

export default Tooltip;
