import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { bcwSandbox } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await bcwSandbox.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(accountInfo){
    const res = await bcwSandbox.put('account',accountInfo)
    AppState.account = new Account(res.data)
  }
}

export const accountService = new AccountService()
