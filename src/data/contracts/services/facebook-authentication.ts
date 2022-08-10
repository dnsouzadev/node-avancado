import { AuthenticationError } from '@/domain/errors'
import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly LoadUserAccountRepo: LoadUserAccountRepository
  ) { }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.loadFacebookUserApi.loadUser(params)
    if (fbData !== undefined) {
      await this.LoadUserAccountRepo.load({ email: fbData.email })
    }
    return new AuthenticationError()
  }
}
