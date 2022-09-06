import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orders {
  /**
   * @column ID
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * @column Name
   */
  @Column()
  name: string;

  /**
   * @column phoneNumber
   */
  @Column()
  phoneNumber: number;
}
