class Mapper {
    static UserToAPI(user) {
        return {
            id: user.id,
            id_type: user.id_type,
        }
    }
}

module.exports = Mapper;