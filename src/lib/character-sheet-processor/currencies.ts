import { CurrenciesType } from "../../dm-tools-data.types"
import { Logger } from "../../logger/Logger"

const logger = new Logger('[characterSheetProcessor][currencies]')

export default function currencies(currencies: CurrenciesType, inventory: any): CurrenciesType {
	logger.debug('Building currencies')

	const containerCurrencies: CurrenciesType[] = inventory.filter((item: any) => item.currency)
		.map((container: any) => container.currency)

	const totalledCurrencies = {
		cp: containerCurrencies.reduce((acc, obj) => acc + obj.cp, currencies.cp),
		sp: containerCurrencies.reduce((acc, obj) => acc + obj.sp, currencies.sp),
		gp: containerCurrencies.reduce((acc, obj) => acc + obj.gp, currencies.gp),
		ep: containerCurrencies.reduce((acc, obj) => acc + obj.ep, currencies.ep),
		pp: containerCurrencies.reduce((acc, obj) => acc + obj.pp, currencies.pp)
	}

	function totalGold(currencies: CurrenciesType): number {
		const copper = currencies.cp / 100
		const silver = currencies.sp / 10
		const gold = currencies.gp
		const electrum = currencies.ep / 2
		const platinum = currencies.pp * 10
		return copper + silver + gold + electrum + platinum
	}

	return {
		...totalledCurrencies,
		total: Math.round(totalGold(totalledCurrencies) * 100) / 100
	}
}
