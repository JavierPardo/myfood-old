using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Fix_BranchPreferenceTrigger_Script : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            CREATE OR REPLACE FUNCTION insert_branchpreferences() RETURNS TRIGGER AS $$
                BEGIN
                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") VALUES
                                        ( NEW.""Id"", 'Modulo.Pickup','0', TRUE, 'bit'),
                                        ( NEW.""Id"", 'Modulo.Delivery','0', TRUE, 'bit'),
                                        ( NEW.""Id"", 'Modulo.Camarero','0', FALSE, 'bit'),
                                        ( NEW.""Id"", 'Modulo.Reservas','0', FALSE, 'bit'),
                                        ( NEW.""Id"", 'Comision.Pickup.Procesador','0', TRUE, 'decimal'),
                                        ( NEW.""Id"", 'Comision.Pickup.Efectivo','0', TRUE, 'decimal'),
                                        ( NEW.""Id"", 'Comision.Delivery.Procesador','0', TRUE, 'decimal'),
                                        ( NEW.""Id"", 'Comision.Delivery.Efectivo','0', TRUE, 'decimal'),
                                        ( NEW.""Id"", 'Comision.Camarero.Procesador','0', TRUE, 'decimal'),
                                        ( NEW.""Id"", 'Comision.Camarero.Efectivo','0', TRUE, 'decimal'),
                                        ( NEW.""Id"", 'Comision.Reservas.CobroUnitario','0', TRUE, 'decimal'),
                                        ( NEW.""Id"", 'Preferencias.Reservas.CobroFijo','0', TRUE, 'bit'),
                                        ( NEW.""Id"", 'Preferencias.Pickup.Programar','0', FALSE, 'bit'),
                                        ( NEW.""Id"", 'Preferencias.Camarero.BotonLlamar','0', FALSE, 'bit'),
                                        ( NEW.""Id"", 'Preferencias.Reservas.AutoConfirmar','0', FALSE, 'bit'),
                                        ( NEW.""Id"", 'Preferencias.Pedidos.AutoConfirmar','0', FALSE, 'bit'),
                                        ( NEW.""Id"", 'Preferencias.Reservas.Tiempo.AutoConfirmar','0', FALSE, 'bit'),
                                        ( NEW.""Id"", 'Preferencias.Pedidos.Tiempo.AutoConfirmar','0', FALSE, 'bit'),
                                        ( NEW.""Id"", 'Preferencias.Reservas.HorarioStandard','', FALSE, 'string'),
                                        ( NEW.""Id"", 'Preferencias.Pedidos.HorarioStandard','', FALSE, 'string');
                            
                        RETURN NEW;
                END;
            $$ LANGUAGE plpgsql;");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
