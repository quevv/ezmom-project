import jwtDecode from 'jwt-decode'

const TokenDecode = (token) => {
    const decode = jwtDecode(token);
    const account = {
        accountId: decode.AccountId,
        name: decode.Name,
        email: decode.Email,
        role: decode.Role,
        address: decode.Address,
        phoneNumber: decode.PhoneNumber,
    }

    return account;
}

export default TokenDecode