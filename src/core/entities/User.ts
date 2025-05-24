import { hash, compare } from 'bcryptjs';

// crio a entidade user com seus atributos
export class User {
    public readonly id: string;
    public name: string;
    public email: string;
    public password_hash: string;
    created_at: Date;
    updated_at: Date;

    // passo os atributos pro constructor
    private constructor(
        // omite os atributos que são gerados automaticamente e métodos
        props: Omit<
            User,
            'id' | 'created_at' | 'updated_at' | 'comparePassword'
        >,
        id?: string,
        created_at?: Date,
        updated_at?: Date
    ) {
        this.id = id || crypto.randomUUID(); // se nao tiver ID gera um (uuid) automaticamente
        this.name = props.name;
        this.email = props.email;
        this.password_hash = props.password_hash;
        this.created_at = created_at || new Date(); // se nao tiver cria a data
        this.updated_at = updated_at || new Date(); // se nao tiver cria a data
    }

    // método que cria o user
    static async create(props: {
        name: string;
        email: string;
        password: string;
    }): Promise<User> {
        // função pra fazer o hash da senha
        const hashedPassword = await hash(props.password, 6);

        // retorna o novo user com a senha hashed
        return new User({
            name: props.name,
            email: props.email,
            password_hash: hashedPassword,
        });
    }
    // método que cria uma nova entidade User ao ser chamado
    static reconstitute(props: {
        id: string;
        name: string;
        email: string;
        password_hash: string;
        created_at: Date;
        updated_at: Date;
    }): User {
        return new User(
            // método que cria uma nova entidade User a partir de dados já existentes (ex: vindos do db)
            {
                name: props.name,
                email: props.email,
                password_hash: props.password_hash,
            },
            // passa os dados gerados automaticamente separadamente
            props.id,
            props.created_at,
            props.updated_at
        );
    }

    // método que compara se a senha pura bate com a hashed
    public async comparePassword(password: string): Promise<boolean> {
        return compare(password, this.password_hash);
    }
}
