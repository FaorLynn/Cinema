package cinema.restcontroller;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import cinema.dao.IDAOCinema;
import cinema.dao.IDAOResponsable;
import cinema.model.Cinema;
import cinema.model.Responsable;


@WebMvcTest(controllers = CinemaRestController.class)
public class CinemaRestControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private IDAOCinema daoCinema;
    @MockitoBean
    private IDAOResponsable daoResponsable;

    @Test
    @WithMockUser
    void shouldFindAllStatusOk() throws Exception {
        // given
        String url = "/api/cinema";
        Mockito.when(daoCinema.findAll()).thenReturn(List.of(new Cinema()));

        // when
        ResultActions result = mockMvc.perform(
            MockMvcRequestBuilders.get(url)
        );

        // then
        result.andExpect(MockMvcResultMatchers.status().isOk());
        result.andExpect(MockMvcResultMatchers.jsonPath("$").isArray());

        Mockito.verify(daoCinema).findAll();
    }


    @Test
    @WithMockUser
    void shouldFindByIdStatusOk() throws Exception {
        // given
        int id = 1;
        String url = "/api/cinema/" + id;

        Cinema cinema = new Cinema();
        cinema.setId(id);
        cinema.setNom("cinema test");

        Mockito.when(daoCinema.findById(id))
            .thenReturn(Optional.of(cinema));

        // when
        ResultActions result = mockMvc.perform(
            MockMvcRequestBuilders.get(url)
        );

        // then
        result.andExpect(MockMvcResultMatchers.status().isOk());
        result.andExpect(MockMvcResultMatchers.jsonPath("$.id").value(id));
        result.andExpect(MockMvcResultMatchers.jsonPath("$.nom").value("cinema test"));

        Mockito.verify(daoCinema).findById(id);
    }

    @Test
    @WithMockUser
    void shouldCreateStatusOk() throws Exception {
        // given
        String url = "/api/cinema";
        int responsableId = 10;

        Responsable responsable = Mockito.mock(Responsable.class);
        Mockito.when(responsable.getId()).thenReturn(responsableId);
        Mockito.when(daoResponsable.findById(responsableId))
            .thenReturn(Optional.of(responsable));

        Mockito.when(daoCinema.save(Mockito.any(Cinema.class)))
            .thenAnswer(invocation -> invocation.getArgument(0));

        ArgumentCaptor<Cinema> cptCinema = ArgumentCaptor.captor();

        // when
        ResultActions result = this.mockMvc.perform(
            MockMvcRequestBuilders
                .post(url)
                .content("""
                    {
                        "nom": "cinema test",
                        "adresse": {
                            "numero": "10",
                            "voie": "rue du test",
                            "ville": "testville",
                            "cp": "10000"
                        },
                        "responsableId": 10
                    }
                """)
                .contentType(MediaType.APPLICATION_JSON)
                .with(SecurityMockMvcRequestPostProcessors.csrf())
        );

        // then
        result.andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(this.daoCinema).save(cptCinema.capture());

        Cinema savedCinema = cptCinema.getValue();
        Assertions.assertEquals("cinema test", savedCinema.getNom());
    }

    @Test
    @WithMockUser
    void shouldUpdateStatusOk() throws Exception {
        // given
        int id = 1;
        int responsableId = 10;
        String url = "/api/cinema/" + id;

        Cinema cinema = new Cinema();
        cinema.setId(id);
        cinema.setNom("ancien nom");

        Responsable responsable = Mockito.mock(Responsable.class);
        Mockito.when(daoCinema.findById(id)).thenReturn(Optional.of(cinema));
        Mockito.when(daoResponsable.findById(responsableId)).thenReturn(Optional.of(responsable));
        ArgumentCaptor<Cinema> cptCinema = ArgumentCaptor.forClass(Cinema.class);
        //retourne le même objet Cinema que celui reçu par save()
        Mockito.when(daoCinema.save(Mockito.any(Cinema.class)))
            .thenAnswer(invocation -> invocation.getArgument(0));

        // when
        ResultActions result = mockMvc.perform(
            MockMvcRequestBuilders
                .put(url)
                .content("""
                    {
                        "nom": "cinema modifie",
                        "adresse": {
                            "numero": "10",
                            "voie": "rue du test",
                            "ville": "Nantes",
                            "cp": "44000"
                        },
                        "responsableId": 10
                    }
                """)
                .contentType(MediaType.APPLICATION_JSON)
                .with(SecurityMockMvcRequestPostProcessors.csrf())
        );

        // then
        result.andExpect(MockMvcResultMatchers.status().isOk());
        result.andExpect(MockMvcResultMatchers.jsonPath("$.nom").value("cinema modifie"));

        Mockito.verify(daoCinema).findById(id);
        Mockito.verify(daoCinema).save(cptCinema.capture());

        Cinema updatedCinema = cptCinema.getValue();

        Assertions.assertEquals(id, updatedCinema.getId());
        Assertions.assertEquals("cinema modifie", updatedCinema.getNom());
        Assertions.assertEquals(responsable, updatedCinema.getResponsable());
    }

    @Test
    @WithMockUser
    void shouldDeleteByIdStatusOk() throws Exception {
        // given
        int id = 1;
        String url = "/api/cinema/" + id;

        // when
        ResultActions result = this.mockMvc.perform(
            MockMvcRequestBuilders
                .delete(url)
                .with(SecurityMockMvcRequestPostProcessors.csrf())
        );

        // then
        result.andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(this.daoCinema).deleteById(id); // On vérifie si deleteById a été appelée
    }
}



