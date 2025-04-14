export function trimText(input: string, maxLength: number = 100): string {
	if (input.length <= maxLength) return input;
	return input.substring(0, maxLength - 3) + "...";
}

export function getCurrentTimeInHanoi(): Date {
	// Просто возвращаем текущую дату — форматирование сделаем отдельно
	return new Date();
}

export function formatTimeForHanoi(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
		hour: "numeric",
		minute: "2-digit",
		second: "2-digit",
		hour12: true,
		timeZone: "Asia/Bangkok", // Подходит и для Ханоя (одна и та же зона: UTC+7)
	};

	const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
		date
	);

	return formattedTime + " ICT"; // Индокитайское время (официально UTC+7, подходит для Вьетнама)
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "Asia/Bangkok", // Чтобы дата тоже была по Вьетнаму
	});
}
