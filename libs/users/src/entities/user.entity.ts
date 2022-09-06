import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  /**
   * @column Id
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * @column name
   */
  @Column()
  name: string;

  /**
   * @column email
   */
  @Column()
  email: string;

  /**
   * @column password
   */
  @Column({ nullable: true })
  password: string;
}
