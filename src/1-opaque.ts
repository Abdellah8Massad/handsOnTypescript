import { expectTypeOf } from "vitest";
import { type Opaque, type UUID } from "./utils";

/**
 * Opaque
 */
export function testOpaque() {
    /**
     * Ajouter un type opaque
     *
     * L'erreur dans le premier it indique uniquement que l'import UUID n'est pas utilisé.
     * vous devez fixer le typage dans le fichier utils.ts
     */
    type NumberAlias = number;
    type UserId = Opaque<number, "user">;
    type CompanyId = Opaque<number, "company">;

    expectTypeOf<NumberAlias>().not.toEqualTypeOf<UserId>();
    expectTypeOf<UserId>().not.toEqualTypeOf<CompanyId>();

    /**
     * Pouvoir utiliser un uuid
     *
     * Go to ./utils.ts to implement working type
     * Attention, ici on ne cherche PAS la similitude
     * Il est discret mais dans l'expect vous avez un .not.toEqualTypeOf<>
     */
    type StringAlias = string;
    type UserUUID = UUID<"user">;
    type CompanyUUID = UUID<"company">;

    expectTypeOf<StringAlias>().not.toEqualTypeOf<UserUUID>();
    expectTypeOf<UserUUID>().not.toEqualTypeOf<CompanyUUID>();

    /**
     * Pouvoir ajouter séparément uuid et types opaque
     *
     * Attention, ici comme dans le cas précédent on ne cherche PAS la similitude
     * Il est discret mais dans l'expect vous avez un .not.toEqualTypeOf<>
     */
    expectTypeOf<UserId>().not.toEqualTypeOf<UserUUID>();
}
